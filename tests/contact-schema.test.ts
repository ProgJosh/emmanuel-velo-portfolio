import { describe, expect, it } from 'vitest';
import { buildInquiryBody, contactSchema, type ContactFormValues } from '../lib/contact-schema';

const validMessage: ContactFormValues = {
  fullName: 'Alex Recruiter',
  email: 'alex@example.com',
  company: 'Example Company',
  inquiryType: 'Employment Opportunity',
  message: 'We are hiring a web developer to improve a responsive business application.',
  contactMethod: 'Email',
  consent: true,
  website: '',
};

describe('contactSchema', () => {
  it('accepts a complete legitimate message', () => {
    expect(contactSchema.safeParse(validMessage).success).toBe(true);
  });

  it('rejects invalid email, short descriptions, missing consent, and the honeypot', () => {
    const result = contactSchema.safeParse({
      ...validMessage,
      email: 'not-an-email',
      message: 'Too short',
      consent: false,
      website: 'spam.example',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => issue.path[0]);
      expect(fields).toEqual(expect.arrayContaining(['email', 'message', 'consent', 'website']));
    }
  });

  it('builds a plain-text brief without HTML interpolation', () => {
    const body = buildInquiryBody(validMessage);
    expect(body).toContain('MESSAGE FOR EMMANUEL JOSH VELO');
    expect(body).toContain('Full name: Alex Recruiter');
    expect(body).toContain('Preferred contact method: Email');
  });
});
