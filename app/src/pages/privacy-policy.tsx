import ContentGrid from "@/components/content-grid"

const PrivacyPolicy = () => {
  return (
    <ContentGrid>
      <>
        <h1 className="display-4">Privacy Policy</h1>

        <h2 className="mt-4">Information Collection and Use</h2>

        <p>We aim to keep your use of our website anonymous whenever possible. If we do collect personal information (like name, address, or email), it's on a voluntary basis and won't be shared without your consent.
        We don't allow third parties to use contact information provided on our site for unsolicited advertising or spam. Legal action will be taken against any such misuse.</p>

        <h2 className="mt-4">Log Data</h2>

        <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>

        <h2 className="mt-4">Security</h2>

        <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security</p>


        <h2 className="mt-4">Contact Us</h2>

        <p>If you have any questions about this Privacy Policy, please contact us on <a href="mailto:info@eafcdb.app">info@eafcdb.app</a></p>

      </>
    </ContentGrid>
  )
}

export default PrivacyPolicy