import { useState, useEffect, useRef } from "react";
import {
    collection, query, orderBy, onSnapshot,
    addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Edit2, Trash2, Eye, EyeOff, FileText,
    X, Check, Tag, Calendar, BarChart2, Loader2
} from "lucide-react";
import { format } from "date-fns";
import type { BlogPost, BlogStatus } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/types/blog";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { RichTextEditor } from "@/components/RichTextEditor";

// ─── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: BlogStatus }) => (
    <span className={cn(
        "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border",
        status === "published"
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-amber-500/15 text-amber-400 border-amber-500/30",
    )}>
        {status}
    </span>
);

// ─── Empty form state ─────────────────────────────────────────────────────────
const emptyForm = (): Partial<BlogPost> => ({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: BLOG_CATEGORIES[0],
    tags: [],
    status: "draft",
    author: { name: "Scalvicon Team" },
    views: 0,
});

const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ─── Post Form Modal ───────────────────────────────────────────────────────────
const PostFormModal = ({
    post,
    onClose,
}: {
    post: BlogPost | null;
    onClose: () => void;
}) => {
    const isEdit = !!post;
    const [form, setForm] = useState<Partial<BlogPost>>(post ?? emptyForm());
    const [tagInput, setTagInput] = useState("");
    const [saving, setSaving] = useState(false);

    const set = (k: keyof BlogPost, v: BlogPost[keyof BlogPost]) =>
        setForm((f) => ({ ...f, [k]: v }));

    const handleTitleChange = (t: string) => {
        set("title", t);
        if (!isEdit) set("slug", slugify(t));
    };

    const addTag = () => {
        const t = tagInput.trim().toLowerCase();
        if (t && !(form.tags ?? []).includes(t)) {
            set("tags", [...(form.tags ?? []), t]);
        }
        setTagInput("");
    };

    const removeTag = (t: string) =>
        set("tags", (form.tags ?? []).filter((x) => x !== t));

    const handleSave = async () => {
        if (!form.title?.trim()) { toast.error("Title is required"); return; }
        if (!form.content?.trim()) { toast.error("Content is required"); return; }
        if (!form.excerpt?.trim()) { toast.error("Excerpt is required"); return; }
        setSaving(true);
        try {
            const isPublishing = form.status === "published";
            const payload: Record<string, unknown> = {
                title: form.title,
                slug: form.slug || slugify(form.title!),
                excerpt: form.excerpt,
                content: form.content,
                coverImage: form.coverImage ?? null,
                author: form.author ?? { name: "Scalvicon Team" },
                category: form.category ?? BLOG_CATEGORIES[0],
                tags: form.tags ?? [],
                status: form.status ?? "draft",
                views: form.views ?? 0,
                updatedAt: serverTimestamp(),
            };

            if (isEdit) {
                // On edit: only update publishedAt if switching to published and no publishedAt yet
                if (isPublishing && !post!.publishedAt) {
                    payload.publishedAt = serverTimestamp();
                }
                await updateDoc(doc(db, "blog", post!.id), payload);
                toast.success("Post updated");
            } else {
                // On create: always set publishedAt so orderBy works
                payload.publishedAt = serverTimestamp();
                await addDoc(collection(db, "blog"), payload);
                toast.success("Post created");
            }
            onClose();
        } catch (err) {
            console.error("Save error:", err);
            toast.error("Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl bg-card border border-border rounded-card card-shadow flex flex-col max-h-[92vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="font-display font-bold text-lg text-foreground">
                        {isEdit ? "Edit Post" : "New Blog Post"}
                    </h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-foreground/5 text-muted-foreground">
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 overflow-y-auto flex-1">
                    {/* Title */}
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                            Title *
                        </label>
                        <input
                            value={form.title ?? ""}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="How to Get More Customers with a Website"
                            className={inputClass}
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                            Slug (URL)
                        </label>
                        <input
                            value={form.slug ?? ""}
                            onChange={(e) => set("slug", e.target.value)}
                            className={cn(inputClass, "font-mono text-xs")}
                        />
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                            Cover Image URL <span className="text-muted-foreground/50">(optional)</span>
                        </label>
                        <input
                            value={form.coverImage ?? ""}
                            onChange={(e) => set("coverImage", e.target.value)}
                            placeholder="https://images.unsplash.com/…"
                            className={inputClass}
                        />
                        {form.coverImage && (
                            <img
                                src={form.coverImage}
                                alt="Cover preview"
                                className="mt-2 w-full h-32 object-cover rounded-lg border border-border"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        )}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                            Excerpt * <span className="text-muted-foreground/50">(shown in card previews)</span>
                        </label>
                        <textarea
                            value={form.excerpt ?? ""}
                            onChange={(e) => set("excerpt", e.target.value)}
                            placeholder="A brief summary of the post…"
                            rows={2}
                            className={cn(inputClass, "resize-none")}
                        />
                    </div>

                    {/* Content — Rich Text Editor */}
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Content * <span className="text-muted-foreground/50">(rich text — supports headings, bold, lists, code, images)</span>
                        </label>
                        <RichTextEditor
                            value={form.content ?? ""}
                            onChange={(html) => set("content", html)}
                            placeholder="Start writing your blog post content…"
                        />
                    </div>

                    {/* Category + Status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                                Category
                            </label>
                            <select
                                value={form.category ?? ""}
                                onChange={(e) => set("category", e.target.value)}
                                className={inputClass}
                            >
                                {BLOG_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                                Status
                            </label>
                            <select
                                value={form.status ?? "draft"}
                                onChange={(e) => set("status", e.target.value as BlogStatus)}
                                className={inputClass}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                            Tags
                        </label>
                        <div className="flex gap-2">
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                                placeholder="Add tag + Enter"
                                className={cn(inputClass, "flex-1")}
                            />
                            <button
                                onClick={addTag}
                                className="px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        {(form.tags ?? []).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {(form.tags ?? []).map((t) => (
                                    <span key={t} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                        <Tag size={9} /> {t}
                                        <button onClick={() => removeTag(t)} className="ml-0.5 hover:text-red-400">
                                            <X size={9} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                        <Check size={14} />
                        {saving ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Main BlogAdmin component ──────────────────────────────────────────────────
const BlogAdmin = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalPost, setModalPost] = useState<BlogPost | null | "new">(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const unsubRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        // Order by updatedAt so we don't need a composite index for the admin list
        const q = query(collection(db, "blog"), orderBy("updatedAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as BlogPost[]);
                setLoading(false);
            },
            (err) => {
                console.error("BlogAdmin fetch error:", err);
                setLoading(false);
            },
        );
        unsubRef.current = unsub;
        return () => unsub();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this post? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            await deleteDoc(doc(db, "blog", id));
            toast.success("Post deleted");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setDeletingId(null);
        }
    };

    const toggleStatus = async (post: BlogPost) => {
        const newStatus: BlogStatus = post.status === "published" ? "draft" : "published";
        try {
            const update: Record<string, unknown> = {
                status: newStatus,
                updatedAt: serverTimestamp(),
            };
            // Set publishedAt when publishing for the first time
            if (newStatus === "published" && !post.publishedAt) {
                update.publishedAt = serverTimestamp();
            }
            await updateDoc(doc(db, "blog", post.id), update);
            toast.success(`Post ${newStatus === "published" ? "✅ published" : "moved to drafts"}`);
        } catch (err) {
            console.error("Toggle status error:", err);
            toast.error("Failed to update status");
        }
    };

    const published = posts.filter((p) => p.status === "published").length;
    const drafts = posts.filter((p) => p.status === "draft").length;

    return (
        <div className="space-y-6">
            {/* Top bar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <FileText size={14} /> {posts.length} total
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                        <Eye size={13} /> {published} published
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                        <EyeOff size={13} /> {drafts} drafts
                    </span>
                </div>
                <button
                    onClick={() => setModalPost("new")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-all"
                >
                    <Plus size={15} /> New Post
                </button>
            </div>

            {/* Posts list */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-card border border-border bg-card animate-pulse" />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground rounded-card border border-dashed border-border">
                    <FileText size={32} className="opacity-30" />
                    <p className="text-sm">No blog posts yet.</p>
                    <button
                        onClick={() => setModalPost("new")}
                        className="text-xs text-primary hover:underline"
                    >
                        Create your first post →
                    </button>
                </div>
            ) : (
                <motion.div initial="hidden" animate="visible" className="space-y-3">
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            variants={fadeUp}
                            className="bg-card border border-border rounded-card p-4 flex items-start gap-4 hover:border-primary/20 transition-colors"
                        >
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h3 className="font-semibold text-sm text-foreground truncate">{post.title}</h3>
                                    <StatusBadge status={post.status} />

                                    {/* SEO Score Badge */}
                                    {post.seo?.score !== undefined && (
                                        <span className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-medium border",
                                            post.seo.score >= 80 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                post.seo.score >= 60 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                    "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            SEO: {post.seo.score}/100
                                        </span>
                                    )}

                                    {/* Processing indicator */}
                                    {post.status === 'published' && !post.seoOptimized && (
                                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                            Optimizing SEO...
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{post.excerpt}</p>

                                {/* SEO Recommendations */}
                                {post.seo?.recommendations && post.seo.recommendations.length > 0 && (
                                    <details className="mb-2">
                                        <summary className="cursor-pointer text-xs font-medium text-primary hover:underline outline-none list-item">
                                            View SEO Recommendations ({post.seo.recommendations.length})
                                        </summary>
                                        <ul className="mt-1 space-y-1 text-[10px] text-muted-foreground pl-4">
                                            {post.seo.recommendations.map((rec, idx) => (
                                                <li key={idx} className="list-disc">{rec}</li>
                                            ))}
                                        </ul>
                                    </details>
                                )}

                                {/* Focus Keyword */}
                                {post.seo?.focusKeyword && (
                                    <p className="mb-2 text-[10px] text-muted-foreground">
                                        🎯 Focus Keyword: <span className="font-medium text-foreground">{post.seo.focusKeyword}</span>
                                    </p>
                                )}

                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Tag size={10} /> {post.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BarChart2 size={10} /> {post.views} views
                                    </span>
                                    {post.publishedAt && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} />
                                            {format(post.publishedAt.toDate(), "dd MMM yyyy")}
                                        </span>
                                    )}
                                    {(post.tags ?? []).slice(0, 3).map((t) => (
                                        <span key={t} className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => toggleStatus(post)}
                                    title={post.status === "published" ? "Move to draft" : "Publish"}
                                    className={cn(
                                        "p-1.5 rounded-lg transition-colors",
                                        post.status === "published"
                                            ? "text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20"
                                            : "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20",
                                    )}
                                >
                                    {post.status === "published" ? <Eye size={14} /> : <EyeOff size={14} />}
                                </button>
                                <button
                                    onClick={() => setModalPost(post)}
                                    title="Edit"
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    disabled={deletingId === post.id}
                                    title="Delete"
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Post form modal */}
            <AnimatePresence>
                {modalPost !== null && (
                    <PostFormModal
                        post={modalPost === "new" ? null : modalPost}
                        onClose={() => setModalPost(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogAdmin;
