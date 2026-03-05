"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scalviconChatbot = exports.optimizeBlogSEO = exports.onNewLead = void 0;
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const params_1 = require("firebase-functions/params");
const nodemailer = require("nodemailer");
const openai_1 = require("openai");
admin.initializeApp();
// ─── Params — replaces deprecated functions.config() ─────────────────────────
// These are set via: firebase functions:secrets:set EMAIL_USER (etc.)
// OR via a .env.local file in the functions directory
const EMAIL_USER = (0, params_1.defineString)("EMAIL_USER", { description: "Gmail address to send from" });
const EMAIL_PASS = (0, params_1.defineSecret)("EMAIL_PASS"); // Stored as a Google Cloud Secret
const ADMIN_EMAIL = (0, params_1.defineString)("ADMIN_EMAIL", { default: "krishnamaurya2204@gmail.com", description: "Admin recipient email" });
const OPENAI_API_KEY = (0, params_1.defineSecret)("OPENAI_API_KEY");
// ─── Transporter factory (called at runtime so params are resolved) ───────────
const makeTransporter = (pass) => nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER.value(),
        pass,
    },
});
// ─── onNewLead — triggers on every new document in 'leads' ───────────────────
exports.onNewLead = functions
    .region("us-central1")
    .runWith({ secrets: ["EMAIL_PASS"] })
    .firestore.document("leads/{leadId}")
    .onCreate(async (snap, context) => {
    const lead = snap.data();
    const leadId = context.params["leadId"];
    const emailUser = EMAIL_USER.value();
    const emailPass = EMAIL_PASS.value();
    const adminEmail = ADMIN_EMAIL.value();
    const submittedAt = lead.createdAt
        ? lead.createdAt.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const mailOptions = {
        from: `Scalvicon Alerts <${emailUser}>`,
        to: adminEmail,
        subject: `🚀 New Lead: ${lead.name} — ${lead.businessType}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#0d161f;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <div style="background:linear-gradient(135deg,#1a2a3a,#0d161f);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:28px 32px;margin-bottom:20px;text-align:center;">
      <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
        Scalvi<span style="color:#00e5a0;">con</span>
      </div>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:6px;margin-bottom:0;">
        New lead received — ${submittedAt} IST
      </p>
    </div>

    <div style="background:#1a2a3a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:28px 32px;margin-bottom:16px;">
      <h2 style="color:#00e5a0;font-size:18px;margin-top:0;margin-bottom:20px;">Contact Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;width:30%;">Name</td><td style="color:#fff;font-size:14px;font-weight:600;padding:6px 0;">${lead.name}</td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Business</td><td style="color:#fff;font-size:14px;padding:6px 0;">${lead.businessName}</td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Type</td><td style="color:#fff;font-size:14px;padding:6px 0;">${lead.businessType}</td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Phone</td><td style="font-size:14px;padding:6px 0;"><a href="tel:+91${lead.phone}" style="color:#00e5a0;text-decoration:none;">+91 ${lead.phone}</a></td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Email</td><td style="font-size:14px;padding:6px 0;"><a href="mailto:${lead.email}" style="color:#00e5a0;text-decoration:none;">${lead.email}</a></td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Budget</td><td style="color:#fff;font-size:14px;padding:6px 0;">${lead.budget}</td></tr>
      </table>
    </div>

    ${lead.message ? `
    <div style="background:#1a2a3a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 32px;margin-bottom:16px;">
      <h3 style="color:rgba(255,255,255,0.6);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-top:0;margin-bottom:12px;">Message</h3>
      <p style="color:#fff;font-size:14px;line-height:1.6;margin:0;">${lead.message}</p>
    </div>` : ""}

    <div style="text-align:center;margin:24px 0;">
      <a href="https://scalvicon-9bf2f.web.app/admin" style="display:inline-block;background:#00e5a0;color:#0d161f;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin:6px;">Open Admin Panel</a>
      <a href="https://wa.me/${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}! This is Scalvicon team. We received your inquiry for ${lead.businessType} website. Are you available for a quick call?`)}" style="display:inline-block;background:#25d366;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin:6px;">WhatsApp Lead</a>
    </div>

    <p style="text-align:center;color:rgba(255,255,255,0.25);font-size:11px;margin-top:24px;">
      Scalvicon · Lead ID: ${leadId} · This is an automated alert
    </p>
  </div>
</body>
</html>`,
    };
    try {
        await makeTransporter(emailPass).sendMail(mailOptions);
        console.log(`✅ Email sent for lead ${leadId} (${lead.name})`);
    }
    catch (err) {
        console.error(`❌ Failed to send email for lead ${leadId}:`, err);
    }
    return null;
});
// ─── SEO Optimization Cloud Function ─────────────────────────────────────────
exports.optimizeBlogSEO = functions
    .region("us-central1")
    .runWith({ secrets: ["OPENAI_API_KEY"], timeoutSeconds: 120 })
    .firestore.document("blog/{postId}")
    .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const oldData = change.before.data();
    // Only run when status changes to 'published' for the first time
    if (newData.status === 'published' && oldData.status === 'draft' && !newData.seoOptimized) {
        const postId = context.params.postId;
        console.log(`🔍 Starting SEO optimization for post: ${postId}`);
        try {
            const openai = new openai_1.default({
                apiKey: OPENAI_API_KEY.value(),
            });
            const prompt = `
You are an SEO expert. Analyze this blog post and provide SEO optimization recommendations.

BLOG TITLE: ${newData.title}
BLOG CONTENT: ${newData.content.substring(0, 3000)} ${newData.content.length > 3000 ? '...(truncated)' : ''}

Provide a JSON response with:
1. metaDescription: SEO-optimized meta description (150-160 characters, compelling, includes primary keyword)
2. keywords: Array of 5-10 relevant keywords/phrases (focus on long-tail keywords Indian users would search)
3. focusKeyword: Primary keyword this post should rank for
4. seoScore: Score from 0-100 based on content quality, keyword usage, structure
5. recommendations: Array of 3-5 specific actionable improvements
6. suggestedSlug: SEO-friendly URL slug
7. internalLinks: Array of 2-3 suggested internal page links (use: /blog, /pricing, /services, /contact, /portfolio)

Respond ONLY with valid JSON, no markdown formatting.
`;
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1000,
            });
            const aiResponse = completion.choices[0].message.content || '{}';
            // Parse AI response
            let seoData;
            try {
                // Remove markdown code blocks if present
                const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
                seoData = JSON.parse(cleanedResponse);
            }
            catch (parseError) {
                console.error('❌ Failed to parse AI response:', aiResponse);
                throw new Error('AI returned invalid JSON');
            }
            // Update Firestore with SEO data
            await admin.firestore().collection('blog').doc(postId).update({
                seo: {
                    metaDescription: seoData.metaDescription || '',
                    keywords: seoData.keywords || [],
                    focusKeyword: seoData.focusKeyword || '',
                    score: seoData.seoScore || 0,
                    recommendations: seoData.recommendations || [],
                    suggestedSlug: seoData.suggestedSlug || '',
                    internalLinks: seoData.internalLinks || [],
                    optimizedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
                seoOptimized: true,
                slug: seoData.suggestedSlug || newData.slug, // Use AI-suggested slug if better
            });
            console.log(`✅ SEO optimization complete for post: ${postId}`);
            console.log(`📊 SEO Score: ${seoData.seoScore}/100`);
            console.log(`🎯 Focus Keyword: ${seoData.focusKeyword}`);
        }
        catch (error) {
            console.error('❌ SEO optimization failed:', error);
            // Still mark as attempted so we don't retry infinitely
            await admin.firestore().collection('blog').doc(postId).update({
                seoOptimized: true,
                seo: {
                    error: error instanceof Error ? error.message : 'Unknown error',
                    optimizedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
            });
        }
    }
    return null;
});
// ─── Scalvicon AI Chatbot Cloud Function ──────────────────────────────────────
exports.scalviconChatbot = functions
    .region("us-central1")
    .runWith({ secrets: ["OPENAI_API_KEY"], timeoutSeconds: 30 })
    .https.onCall(async (data, context) => {
    const { messages, sessionId, conversationId } = data;
    if (!messages || !Array.isArray(messages)) {
        throw new functions.https.HttpsError("invalid-argument", "Messages are required.");
    }
    const systemPrompt = `
You are Scalvicon's AI sales assistant — friendly, professional, and helpful. Scalvicon is an Indian digital agency that builds websites, ecommerce stores, SEO strategies, booking systems, and real estate portals exclusively for SME businesses.

SERVICES & PRICING:
- Business Website: ₹14,999 – ₹19,999 (5–7 pages, mobile-first)
- Ecommerce Store: ₹24,999 – ₹34,999 (full online store)
- SEO Package: ₹7,999/month (local + national SEO)
- Booking System: ₹19,999 (appointments, calendars)
- Real Estate Portal: ₹29,999 – ₹34,999
- Website Revamp: ₹9,999 – ₹14,999

BEHAVIOR RULES:
1. Keep responses short, warm, and business-friendly (max 3–4 lines)
2. NEVER mention services or prices outside the list above
3. When user shows interest → ask one qualification question at a time:
   a. What type of business do you run?
   b. What is your approximate budget?
   c. When do you need this ready?
   d. Best way to reach you — WhatsApp or email?
4. After 3+ qualification answers → offer WhatsApp CTA or contact form
5. If user asks anything unrelated to Scalvicon services → politely redirect to services
6. Always respond in the same language the user uses (Hindi or English)
7. NEVER hallucinate — if unsure, say "Let me connect you with our team"

CONVERSION TRIGGERS:
- User mentions budget → acknowledge + suggest best fit service
- User mentions urgency → prioritize and offer direct WhatsApp
- User compares competitors → highlight value without naming others
`;
    try {
        const openai = new openai_1.default({
            apiKey: OPENAI_API_KEY.value(),
        });
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map((m) => ({ role: m.role, content: m.content }))
            ],
            temperature: 0.7,
            max_tokens: 300,
        });
        const reply = completion.choices[0].message.content || 'Let me connect you with our team.';
        const leadDetectionCompletion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                ...messages.map((m) => ({ role: m.role, content: m.content })),
                { role: 'assistant', content: reply },
                { role: 'system', content: 'Extract any user contact info (name, business, service interest, budget, email, phone) from the conversation. If found, respond with valid JSON containing: "name", "business", "service", "budget", "contact". If no meaningful contact info or high intent is found, reply with {"leadDetected": false}. Respond ONLY with valid JSON, no markdown.' }
            ],
            temperature: 0,
            response_format: { type: "json_object" }
        });
        let leadData = null;
        let leadDetected = false;
        try {
            const leadStr = leadDetectionCompletion.choices[0].message.content || '{}';
            const parsed = JSON.parse(leadStr.replace(/```json\n?|\n?```/g, '').trim());
            if (parsed.contact || (parsed.name && parsed.service) || parsed.budget) {
                leadDetected = true;
                leadData = parsed;
            }
        }
        catch (e) {
            console.error("Lead extraction parsing failed", e);
        }
        const db = admin.firestore();
        let convId = conversationId;
        if (!convId) {
            const newDoc = await db.collection('chat_conversations').add({
                sessionId,
                messages: messages.concat([{ role: 'assistant', content: reply, timestamp: admin.firestore.FieldValue.serverTimestamp() }]),
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                leadCaptured: leadDetected,
                leadId: null
            });
            convId = newDoc.id;
        }
        else {
            await db.collection('chat_conversations').doc(convId).update({
                messages: admin.firestore.FieldValue.arrayUnion({ role: 'assistant', content: reply, timestamp: admin.firestore.FieldValue.serverTimestamp() }),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                leadCaptured: leadDetected
            });
        }
        if (leadDetected && leadData) {
            const leadDoc = await db.collection('chat_leads').add({
                name: leadData.name || 'Unknown',
                business: leadData.business || '',
                service: leadData.service || '',
                budget: leadData.budget || '',
                contact: leadData.contact || '',
                source: "chatbot",
                conversationId: convId,
                intent: messages[messages.length - 1].content,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            await db.collection('chat_conversations').doc(convId).update({
                leadCaptured: true,
                leadId: leadDoc.id
            });
        }
        return { reply, conversationId: convId, leadDetected, leadData };
    }
    catch (error) {
        console.error('❌ Chatbot error:', error);
        throw new functions.https.HttpsError('internal', 'An error occurred while communicating with the AI.');
    }
});
//# sourceMappingURL=index.js.map