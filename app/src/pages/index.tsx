import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { DStats, getStats } from '@/lib/directus';
import CardWhatYouGet from '@/components/card-what-you-get';
import CardStats from '@/components/card-stats';
import { Api, Ball, Cards, Database, Globe, Images, Players, Shield, Updates } from '@/components/icons';
import { NextSeo } from 'next-seo';

export default function Home({ stats }: { stats: DStats }) {
  const { data } = useSession();
  const isUser = !!data?.user;

  const { players, cards, nations, leagues, clubs } = stats;
  return (
    <>
      <NextSeo title="Home" />
      <section className="container mt-5 mt-lg-6">
        <div className="row">
          <div className="col-12 col-lg-10 mx-auto">
            <div className="pt-2">
              <h1 className="m-0 display-0 text-center">EAFC 2024</h1>
              <h1 className="m-0 display-1 text-center">
                <div className="text-secondary">Your Ultimate Team API</div>
              </h1>
              <p className="lead text-center mt-3">
                Unleash the Power of EAFC Data with seamless API integration, and access to all player data, prices,
                more for your bots, applications, or tools.
              </p>
              <div className="d-flex mt-5 gap-3 justify-content-center">
                {isUser ? (
                  <Link href="/dashboard" className="btn btn-lg btn-primary shadow">
                    Go to dashboard
                  </Link>
                ) : (
                  <button className="btn btn-lg btn-primary shadow" onClick={() => signIn('google')}>
                    Login with Google
                  </button>
                )}
                <Link href="/docs" className="btn btn-lg btn-primary-subtle">
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-6 mt-lg-7">
        <div className="row">
          <div className="col">
            <h1 className="display-1 mb-2 mb-lg-4 text-center">
              What you get
            </h1>
          </div>
        </div>
        <div className="row">
          <CardWhatYouGet
            icon={<Database />}
            title="Full Database"
            description="comprehensive dataset of players, prices, nations, leagues, clubs, and card versions, freely accessible to everyone."
          />

          <CardWhatYouGet
            icon={<Api />}
            title="API First"
            description="A comprehensive and user-friendly API along with up-to-date documentation. To get started, simply obtain your free API key by logging in with Google.
          "
          />

          <CardWhatYouGet
            icon={<Updates />}
            title="Regular Updates"
            description="Our dataset undergoes updates at least daily, if not more frequently, ensuring near real-time synchronization with updates from the EA companion app.
          "
          />

          <CardWhatYouGet
            icon={<Images />}
            title="Player Images"
            description="Our dataset includes imagery for all players, nations, leagues, clubs, and card versions. This feature will soon be available on our API.
          "
          />
        </div>
      </section>

      <section className="container mt-6 mt-lg-7">
        <div className="row">
          <div className="col">
            <h1 className="display-1 mb-2 mb-lg-4 text-center">
              What you get
            </h1>
          </div>
          <div className="row">
            <CardStats metric={players} type="Players" icon={<Players />} />
            <CardStats metric={cards} type="Cards" icon={<Cards />} />
            <CardStats metric={nations} type="Nations" icon={<Globe />} />
            <CardStats metric={leagues} type="Leagues" icon={<Shield />} />
            <CardStats metric={clubs} type="Clubs" icon={<Ball />} />
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const stats = await getStats();
  return { props: { stats } };
}
