export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
        <h2>1. Information We Collect</h2>
        <p>We collect email addresses and authentication data when you create an account. We use Supabase for authentication and data storage.</p>
        <h2>2. How We Use Your Data</h2>
        <p>Your data is used solely to provide our services. We do not sell or share your personal information with third parties.</p>
        <h2>3. Third-Party Services</h2>
        <p>We use Supabase (database/auth), Stripe (payments), and AI providers (DeepSeek / OpenAI) to deliver our service. Each has its own privacy policy.</p>
        <h2>4. Contact</h2>
        <p>Questions? Email us at privacy@saaskit.dev.</p>
      </div>
    </div>
  );
}
