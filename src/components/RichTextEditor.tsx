/**
 * RichTextEditor.tsx
 * A TipTap-powered WYSIWYG editor for blog post composition.
 * Outputs HTML which is stored in Firestore and rendered
 * via dangerouslySetInnerHTML + DOMPurify on the BlogPost page.
 */
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";
import {
    Bold, Italic, Strikethrough,
    Heading2, Heading3,
    List, ListOrdered, Quote,
    Code, Code2,
    Link as LinkIcon, Image as ImageIcon,
    Undo2, Redo2, Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

// ─── Toolbar button ───────────────────────────────────────────────────────────
const ToolbarBtn = ({
    onClick,
    active,
    disabled,
    title,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        disabled={disabled}
        title={title}
        className={cn(
            "p-1.5 rounded-md text-xs transition-colors",
            active
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
            disabled && "opacity-30 pointer-events-none",
        )}
    >
        {children}
    </button>
);

const Divider = () => (
    <span className="w-px h-5 bg-border mx-0.5 self-center" />
);

// ─── Main component ───────────────────────────────────────────────────────────
export const RichTextEditor = ({
    value,
    onChange,
    placeholder = "Write your blog post content here…",
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                bulletList: { keepMarks: true },
                orderedList: { keepMarks: true },
            }),
            Image.configure({
                inline: false,
                allowBase64: false,
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto my-4",
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline underline-offset-2 hover:text-primary/80",
                    rel: "noopener noreferrer",
                    target: "_blank",
                },
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-invert prose-sm max-w-none focus:outline-none min-h-[220px] px-4 py-3",
            },
        },
    });

    // Sync external value changes (e.g. editing existing post)
    useEffect(() => {
        if (!editor || editor.isDestroyed) return;
        const current = editor.getHTML();
        if (value !== current) {
            editor.commands.setContent(value || "", { emitUpdate: false });
        }
    }, [value, editor]);

    const addImage = useCallback(() => {
        const url = window.prompt("Enter image URL:");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addLink = useCallback(() => {
        const url = window.prompt("Enter URL:");
        if (!url || !editor) return;
        if (editor.state.selection.empty) {
            const text = window.prompt("Link text:") || url;
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${url}">${text}</a>`)
                .run();
        } else {
            editor.chain().focus().toggleLink({ href: url }).run();
        }
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/40 bg-background">
            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border bg-card">
                {/* Undo / Redo */}
                <ToolbarBtn
                    title="Undo (Ctrl+Z)"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo2 size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Redo (Ctrl+Shift+Z)"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <Redo2 size={14} />
                </ToolbarBtn>

                <Divider />

                {/* Headings */}
                <ToolbarBtn
                    title="Heading 2"
                    active={editor.isActive("heading", { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Heading 3"
                    active={editor.isActive("heading", { level: 3 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 size={14} />
                </ToolbarBtn>

                <Divider />

                {/* Inline formatting */}
                <ToolbarBtn
                    title="Bold (Ctrl+B)"
                    active={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Italic (Ctrl+I)"
                    active={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Strikethrough"
                    active={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Inline Code"
                    active={editor.isActive("code")}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <Code size={14} />
                </ToolbarBtn>

                <Divider />

                {/* Lists */}
                <ToolbarBtn
                    title="Bullet List"
                    active={editor.isActive("bulletList")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Numbered List"
                    active={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Blockquote"
                    active={editor.isActive("blockquote")}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Code Block"
                    active={editor.isActive("codeBlock")}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    <Code2 size={14} />
                </ToolbarBtn>

                <Divider />

                {/* Embeds */}
                <ToolbarBtn title="Insert Link" onClick={addLink} active={editor.isActive("link")}>
                    <LinkIcon size={14} />
                </ToolbarBtn>
                <ToolbarBtn title="Insert Image (URL)" onClick={addImage}>
                    <ImageIcon size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    title="Horizontal Rule"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <Minus size={14} />
                </ToolbarBtn>
            </div>

            {/* ── Editor area ── */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
