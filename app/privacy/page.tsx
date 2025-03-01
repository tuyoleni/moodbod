'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-4xl mx-auto bg-white rounded border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="border-b border-gray-200 py-6 px-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
                    <Link href="/">
                        <Image 
                            src="/logo.png" 
                            alt="Moodbod Logo" 
                            width={120} 
                            height={40} 
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                <div className="p-8">
                    <div className="space-y-6 text-gray-600">
                        <section className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h2>
                            <p className="mb-3">
                                At Moodbod, we take your privacy seriously. This policy describes how we collect,
                                use, and protect your personal information when you use our services. This Privacy Policy applies to all services offered by Moodbod, including our website, mobile applications, and any other services we provide.
                            </p>
                            <p className="mb-3">
                                By using our services, you consent to the collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree with our policies and practices, do not use our services.
                            </p>
                            <p>
                                This Privacy Policy may change from time to time. Your continued use of our services after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
                            </p>
                        </section>

                        <section className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
                            <p className="mb-3">We collect several types of information from and about users of our services, including:</p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">2.1 Personal Information</h3>
                            <p className="mb-3">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Name, email address, phone number, and other contact information</li>
                                <li>Account credentials such as your username and password</li>
                                <li>Profile information including your photograph, biographical information, preferences, and interests</li>
                                <li>Information from Google authentication when you choose to sign in using your Google account</li>
                                <li>Payment and billing information when you make purchases through our services</li>
                                <li>Communications you send to us, including emails, chat messages, and feedback forms</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">2.2 Usage Information</h3>
                            <p className="mb-3">We automatically collect information about your interactions with our services, including:</p>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Log data, such as your IP address, browser type, operating system, referring webpage, pages visited, and time spent on each page</li>
                                <li>Device information, including device identifiers, hardware model, and operating system</li>
                                <li>Location information, which may include precise location data if you grant permission</li>
                                <li>Activity data related to your use of our services, including workout data, health metrics, and other fitness-related information</li>
                                <li>Cookies and similar tracking technologies that collect information about your browsing behavior</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">2.3 Information from Third Parties</h3>
                            <p className="mb-3">We may receive information about you from third parties, including:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Social media platforms when you connect your account to our services</li>
                                <li>Business partners, such as fitness centers or health service providers</li>
                                <li>Advertising and analytics providers</li>
                                <li>Other users who may provide information about you, such as when they tag you in content</li>
                            </ul>
                        </section>

                        <section className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                            <p className="mb-3">We use the information we collect for various purposes, including to:</p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">3.1 Provide and Improve Our Services</h3>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Create and maintain your account</li>
                                <li>Provide the services you request and process transactions</li>
                                <li>Personalize your experience and deliver content relevant to your interests</li>
                                <li>Develop new features and functionality</li>
                                <li>Monitor and analyze usage patterns and trends</li>
                                <li>Troubleshoot technical issues and debug our services</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">3.2 Communication and Support</h3>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Communicate with you about our services, including updates, security alerts, and support messages</li>
                                <li>Respond to your comments, questions, and requests</li>
                                <li>Provide customer support and technical assistance</li>
                                <li>Send you marketing communications about products, services, offers, and events (you may opt out of these communications)</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">3.3 Security and Protection</h3>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Verify your identity and authenticate your account access</li>
                                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                                <li>Protect the rights, property, and safety of our users and others</li>
                                <li>Enforce our terms of service and other policies</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">3.4 Legal Compliance</h3>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Comply with applicable laws, regulations, and legal processes</li>
                                <li>Respond to lawful requests from public and governmental authorities</li>
                                <li>Enforce our terms and conditions</li>
                                <li>Protect against legal liability</li>
                            </ul>
                        </section>

                        <section className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Data Storage and Security</h2>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">4.1 Data Storage</h3>
                            <p className="mb-3">
                                Your data is stored securely using Firebase, a cloud-based platform provided by Google. We may store and process your information on servers located in various countries around the world, including the United States. By using our services, you consent to the transfer of information to countries outside of your country of residence, which may have different data protection rules than your country.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">4.2 Security Measures</h3>
                            <p className="mb-3">
                                We implement a variety of security measures to maintain the safety of your personal information, including:
                            </p>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Encryption of sensitive data in transit and at rest using industry-standard protocols</li>
                                <li>Regular security assessments and penetration testing</li>
                                <li>Access controls that restrict access to personal information to authorized personnel</li>
                                <li>Secure authentication mechanisms, including multi-factor authentication for administrative access</li>
                                <li>Regular monitoring of our systems for possible vulnerabilities and attacks</li>
                                <li>Physical security measures at our facilities and data centers</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">4.3 Data Retention</h3>
                            <p className="mb-3">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to retain information, we consider the amount, nature, and sensitivity of the information, the potential risk of harm from unauthorized use or disclosure, and whether we can achieve the purposes of the processing through other means.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">4.4 Data Breach Procedures</h3>
                            <p>
                                In the event of a data breach that affects your personal information, we will notify you and the relevant authorities as required by applicable law. We will provide information about the breach, the affected data, and steps you can take to protect yourself from potential harm.
                            </p>
                        </section>

                        <section className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">5.1 Service Providers</h3>
                            <p className="mb-3">
                                We may share your information with third-party service providers who perform services on our behalf, such as:
                            </p>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Google Firebase for data storage, authentication, and analytics</li>
                                <li>Payment processors to handle financial transactions</li>
                                <li>Cloud hosting providers for website and application hosting</li>
                                <li>Customer support services to assist with user inquiries</li>
                                <li>Analytics providers to help us understand how users interact with our services</li>
                                <li>Marketing and advertising partners to deliver relevant content and promotions</li>
                            </ul>
                            <p className="mb-3">
                                These service providers are contractually obligated to use your information only as necessary to provide services to us and in accordance with this Privacy Policy.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">5.2 Third-Party Authentication</h3>
                            <p className="mb-3">
                                When you choose to sign in using Google Authentication or other third-party authentication services, we receive certain information from those services, such as your name, email address, and profile picture. The information we receive depends on the settings and privacy policies of those services.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">5.3 Third-Party Links and Integrations</h3>
                            <p className="mb-3">
                                Our services may contain links to third-party websites, products, or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party websites you visit.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">5.4 Social Media Features</h3>
                            <p>
                                Our services may include social media features, such as the Facebook Like button or sharing widgets. These features may collect your IP address and which page you are visiting, and may set a cookie to enable the feature to function properly. Your interactions with these features are governed by the privacy policy of the company providing them.
                            </p>
                        </section>

                        <section className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">6.1 Access and Control of Your Information</h3>
                            <p className="mb-3">
                                You have certain rights regarding your personal information. Depending on your location and applicable laws, these rights may include:
                            </p>
                            <ul className="list-disc pl-6 mt-2 mb-4">
                                <li>Access to your personal data that we hold</li>
                                <li>Correction of inaccurate or incomplete personal data</li>
                                <li>Deletion of your personal data in certain circumstances</li>
                                <li>Restriction of processing of your personal data</li>
                                <li>Data portability, allowing you to receive your data in a structured, commonly used format</li>
                                <li>Objection to processing of your personal data for certain purposes</li>
                                <li>Withdrawal of consent at any time, where we rely on consent to process your personal data</li>
                            </ul>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">6.2 Account Settings</h3>
                            <p className="mb-3">
                                You can access, update, or delete certain information about you from within your account settings. If you cannot access certain information or have questions about the information we have about you, please contact us using the contact form on our website.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">6.3 Marketing Communications</h3>
                            <p className="mb-3">
                                You can opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional communications, such as those about your account or our ongoing business relations.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">6.4 Cookies and Tracking Technologies</h3>
                            <p className="mb-3">
                                Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services.
                            </p>
                            
                            <h3 className="font-medium text-gray-900 mt-4 mb-2">6.5 Do Not Track</h3>
                        </section>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
            
            <div className="text-center mt-8 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Moodbod. All rights reserved.</p>
            </div>
        </div>
    );  
}