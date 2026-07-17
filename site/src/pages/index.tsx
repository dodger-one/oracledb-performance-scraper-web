import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Read the documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function ArchitectureDiagram() {
  const oracleLogo = useBaseUrl('/img/architecture/oracle.svg');
  const postgresqlLogo = useBaseUrl('/img/architecture/postgresql.png');
  const grafanaLogo = useBaseUrl('/img/architecture/grafana.svg');

  return (
    <section className={styles.architecture}>
      <div className="container">
        <div className={styles.architectureIntro}>
          <span className={styles.eyebrow}>Open performance data pipeline</span>
          <Heading as="h2">Collect once. Investigate from anywhere.</Heading>
          <p>
            Oracle performance history is stored in PostgreSQL, ready for
            dashboards or direct SQL analysis.
          </p>
        </div>

        <div
          className={styles.pipeline}
          role="img"
          aria-label="The scraper collects performance data from Oracle Database, persists it to PostgreSQL, and makes it available to Grafana and direct SQL queries.">
          <div className={styles.systemNode}>
            <img
              className={styles.oracleLogo}
              src={oracleLogo}
              alt="Oracle"
            />
            <span>Oracle Database</span>
            <small>Performance source</small>
          </div>

          <div className={clsx(styles.connector, styles.connectorLeft)}>
            <span>collects</span>
            <i aria-hidden="true" />
          </div>

          <div className={clsx(styles.systemNode, styles.scraperNode)}>
            <span className={styles.scraperWord}>Scraper</span>
            <small>Scheduled collection</small>
          </div>

          <div className={clsx(styles.connector, styles.connectorRight)}>
            <span>persists</span>
            <i aria-hidden="true" />
          </div>

          <div className={styles.systemNode}>
            <img
              className={styles.postgresqlLogo}
              src={postgresqlLogo}
              alt="PostgreSQL"
            />
            <span>PostgreSQL</span>
            <small>Historical store</small>
          </div>

          <div className={clsx(styles.connector, styles.connectorLeft)}>
            <span>queries</span>
            <i aria-hidden="true" />
          </div>

          <div className={styles.consumers}>
            <div className={styles.consumerNode}>
              <img src={grafanaLogo} alt="Grafana" />
              <span>Grafana</span>
            </div>
            <div className={styles.consumerNode}>
              <strong aria-hidden="true">SQL</strong>
              <span>Direct queries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Collect Oracle performance data in PostgreSQL for SQL-backed Grafana dashboards">
      <HomepageHeader />
      <main>
        <ArchitectureDiagram />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
