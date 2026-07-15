import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Flexible Deployment',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Run the scraper as a Linux service, container, Docker Compose service,
        or Kubernetes workload.
      </>
    ),
  },
  {
    title: 'PostgreSQL History',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Store SQL, session, blocking, activity, and configurable metric samples
        in partitioned PostgreSQL tables with retention.
      </>
    ),
  },
  {
    title: 'Performance Troubleshooting',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Investigate database activity, SQL performance, current sessions, and
        blocking with PostgreSQL-backed Grafana dashboards.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
