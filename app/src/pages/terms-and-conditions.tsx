import ContentGrid from '@/components/content-grid';

const TermsAndConditions = () => {
  return (
    <ContentGrid>
      <>
        <h1 className="display-4">Terms and Conditions</h1>

        <h2 className="mt-4">1. Subject of the Agreement</h2>

        <p>
          These Terms and Conditions (T&C) govern the use of "EAFC-DB" and the APIs provided (hereinafter referred to as
          the "Provider"). EAFC-DB allows querying data from the EA sports Ultimate Team (EAFC-UT) through APIs,
          including player information, prices, clubs, nations, leagues, and more.
        </p>

        <h2 className="mt-4">2. Parties to the Agreement</h2>
        <p>The use of EAFC-DB is available to both individuals and companies (hereinafter referred to as "Users").</p>

        <h2 className="mt-4">3. Data Privacy</h2>
        <p>
          The Provider adheres to the provisions of the General Data Protection Regulation (GDPR). The only stored user
          information is the email address required for registration. Further information on data processing can be
          found in our Privacy Policy.
        </p>

        <h2 className="mt-4">4. Support</h2>
        <p>
          Support for EAFC-DB is provided through email <a href="mailto:info@eafcdb.app">info@eafcdb.app</a>
        </p>

        <h2 className="mt-4">5. Disclaimer of Warranty</h2>
        <p>
          The Provider does not warrant the availability, accuracy, or reliability of the data obtained through EAFC-DB.
          Usage is at the user's own risk. Any liability for damages resulting from the use of EAFC-DB is excluded.
        </p>

        <h2 className="mt-4">6. Intellectual Property</h2>
        <p>
          All rights to the EAFC-DB and its content are owned by the Provider. Any reproduction, distribution, or
          modification without the explicit permission of the Provider is prohibited.
        </p>

        <h2 className="mt-4">7. Usage Restrictions</h2>
        <p>
          The use of EAFC-DB is subject to certain restrictions. Users are not allowed to send an unreasonably high
          number of requests to EAFC-DB servers that could disrupt server stability or others user's experience.
        </p>

        <h2 className="mt-4">8. Account Suspension</h2>
        <p>
          The Provider reserves the right to temporarily or permanently suspend accounts if a user violates the usage
          restrictions in Section 7. In such a case, no refund of previously paid fees will be made.
        </p>

        <h2 className="mt-4">9. Availability and Maintenance</h2>
        <p>
          The Provider makes every effort to provide a reliable service. However, it cannot guarantee that the EAFC-DB
          servers will be available without interruptions or outages at all times.
        </p>

        <p>
          The Provider reserves the right to perform maintenance on the service to improve performance and stability.
          During such maintenance, access to EAFC-DB may be temporarily restricted or offline. The Provider will strive
          to minimize such disruptions and conduct maintenance outside of peak usage times whenever possible.
        </p>

        <h2 className="mt-4">10. Changes to the T&C</h2>
        <p>
          The Provider reserves the right to change these T&C at any time. Changes will be announced on the website and
          will take effect 30 days after the announcement. Continued use of EAFC-DB after the changes come into effect
          constitutes acceptance of the updated T&C.
        </p>

        <h2 className="mt-4">11. Termination of the Agreement</h2>
        <p>
          The user may terminate the agreement at any time by closing their account. The Provider may terminate the
          agreement for good cause, especially in case of violations of these T&C, without notice.
        </p>

        <h2 className="mt-4">12. Severability Clause</h2>
        <p>
          If any provision of these T&C is found to be invalid or unenforceable, it shall not affect the validity of the
          remaining provisions. A legally permissible provision that comes closest to achieving the economic purpose of
          the invalid provision shall apply instead.
        </p>
      </>
    </ContentGrid>
  );
};

export default TermsAndConditions;
