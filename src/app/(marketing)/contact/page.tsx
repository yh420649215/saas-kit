export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Sales</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Interested in the Enterprise plan? We&apos;d love to hear from you.
        </p>
        <p className="mt-6 text-muted-foreground">
          Email us at{" "}
          <a href="mailto:sales@saaskit.dev" className="text-primary hover:underline">
            sales@saaskit.dev
          </a>
        </p>
      </div>
    </div>
  );
}
