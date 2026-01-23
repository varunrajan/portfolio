import Section from '@/components/Section';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function WorkWithMe() {
  return (
    <>
      <Section className="bg-bg-page">
        <div className="max-w-3xl mx-auto text-center py-xl">
          <h1 className="text-4xl font-bold text-text-heading mb-md">
            Let's Work Together
          </h1>
          <p className="text-xl text-text-body mb-lg">
            I'm available for consulting, contract work, and full-time opportunities.
          </p>
        </div>
      </Section>

      <Section className="bg-bg-page">
        <div className="grid md:grid-cols-2 gap-lg mb-xl">
          <Card>
            <h2 className="text-2xl font-bold text-text-heading mb-md">What I Do</h2>
            <ul className="space-y-sm text-text-body">
              <li>• Product design and strategy</li>
              <li>• Full-stack development</li>
              <li>• Design system creation</li>
              <li>• Technical consulting</li>
              <li>• Team leadership and mentoring</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-heading mb-md">My Approach</h2>
            <ul className="space-y-sm text-text-body">
              <li>• User-centered design thinking</li>
              <li>• Data-driven decision making</li>
              <li>• Iterative development</li>
              <li>• Clear communication</li>
              <li>• Long-term thinking</li>
            </ul>
          </Card>
        </div>

        <div className="text-center">
          <Button href="/contact" variant="primary" className="text-lg px-xl py-lg">
            Get In Touch
          </Button>
        </div>
      </Section>
    </>
  );
}
