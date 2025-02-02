'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-gray-600">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                        <p>
                            At Moodbod, we take your privacy seriously. This policy describes how we collect,
                            use, and protect your personal information when you use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Name and contact information</li>
                            <li>Account credentials</li>
                            <li>Profile information</li>
                            <li>Information from Google authentication</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Provide and maintain our services</li>
                            <li>Authenticate your identity</li>
                            <li>Communicate with you about our services</li>
                            <li>Improve and personalize your experience</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Storage and Security</h2>
                        <p>
                            Your data is stored securely using Firebase and protected using industry-standard
                            security measures. We use encryption and secure protocols to protect your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
                        <p>
                            We use third-party services including Google Authentication and Firebase.
                            These services have their own privacy policies that govern how they handle your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Access your personal data</li>
                            <li>Request correction of your data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our practices,
                            please contact us at{' '}
                            <a
                                href="mailto:privacy@moodbod.com"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                privacy@moodbod.com
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Updates to This Policy</h2>
                        <p>
                            We may update this privacy policy from time to time. We will notify you of any
                            changes by posting the new policy on this page.
                        </p>
                    </section>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
} 