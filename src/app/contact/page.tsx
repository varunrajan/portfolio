import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Contact() {
  return (
    <>
      <Section className="bg-bg-page">
        <div className="max-w-2xl mx-auto text-center py-xl">
          <h1 className="text-4xl font-bold text-text-heading mb-md">
            Get In Touch
          </h1>
          <p className="text-xl text-text-body mb-lg">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>
      </Section>

      <Section className="bg-bg-page">
        <div className="max-w-2xl mx-auto">
          <Card>
            <form className="space-y-lg">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-body mb-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-md py-sm bg-bg-page border border-neutral-700 rounded-md text-text-body focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-body mb-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-md py-sm bg-bg-page border border-neutral-700 rounded-md text-text-body focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-body mb-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-md py-sm bg-bg-page border border-neutral-700 rounded-md text-text-body focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>

              <div>
                <Button type="submit" variant="primary" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
