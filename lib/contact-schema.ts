import { z } from 'zod';

const cleanText = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

export const contactSchema = z.object({
  fullName: cleanText('Full name', 2, 80),
  email: z.email({ error: 'Enter a valid email address.' }).max(120, 'Email must be 120 characters or fewer.'),
  company: z.string().trim().max(100, 'Company name must be 100 characters or fewer.'),
  inquiryType: z.enum(['Employment Opportunity', 'Professional Collaboration', 'General Message'], {
    error: 'Choose an inquiry type.',
  }),
  message: cleanText('Message', 20, 2000),
  contactMethod: z.enum(['Email', 'LinkedIn message', 'Schedule a call by email'], {
    error: 'Choose a preferred contact method.',
  }),
  consent: z.boolean().refine((value) => value, 'Consent is required before preparing the message.'),
  website: z.string().max(0, 'Unable to prepare this message.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactFormValues = {
  fullName: '',
  email: '',
  company: '',
  inquiryType: 'Employment Opportunity',
  message: '',
  contactMethod: 'Email',
  consent: false,
  website: '',
};

export function buildInquiryBody(values: ContactFormValues) {
  return [
    `MESSAGE FOR EMMANUEL JOSH VELO`,
    '',
    `Full name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Company / organization: ${values.company || 'Not provided'}`,
    `Inquiry type: ${values.inquiryType}`,
    `Preferred contact method: ${values.contactMethod}`,
    '',
    'Message:',
    values.message,
  ].join('\n');
}
