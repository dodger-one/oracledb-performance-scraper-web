---
title: Collection Model
sidebar_position: 2
---

# Collection Model

The scraper has two independent collection paths: native performance samples
and optional additional metrics. They share the global collection schedule but
use different PostgreSQL models and serve different troubleshooting needs.

## Native Performance Collection

Native performance collection is the scraper's default behavior. It does not
require a metric definition file and writes structured Oracle data to dedicated
tables:

| PostgreSQL table | Collected data |
| --- | --- |
| `oracle_sql_samples` | SQL statistics, plans, execution counters, CPU, elapsed time, and I/O |
| `oracle_session_samples` | Current sessions, SQL, waits, modules, programs, and machines |
| `oracle_blocking_session_samples` | Waiter and blocker relationships |
| `oracle_database_activity_samples` | ASH-style activity, with a current-session fallback |

The included Grafana dashboards query these tables directly. They do not query
`oracle_metric_samples`.

Use native collectors for diagnostic entities with many changing dimensions,
including SQL IDs, child cursors, plan hashes, sessions, blocking chains, wait
events, SQL text, modules, programs, and machines. Typed columns make these
values easier to index, aggregate, filter, and evolve than a generic label
document.

## Additional Metrics

Additional metrics are optional SQL-derived measurements loaded from TOML or
YAML definition files:

```yaml
metrics:
  scrapeInterval: 15s
  definitions:
    - /etc/oracledb-monitor/oracle-operational-metrics.toml
    - /etc/oracledb-monitor/application-metrics.toml
```

Each numeric result is stored as a row in:

```text
oracle_metric_samples
```

No additional metrics are collected when `metrics.definitions` is empty or
omitted. Native performance collection continues normally.

The project supplies `oracle-operational-metrics.toml` as an optional starting
pack. It contains bounded operational measurements such as session counts,
resource limits, ASM capacity, activity counters, process counts, wait-class
time, tablespace usage, selected database parameters, platform information,
and cache hit ratios. It is not an embedded fallback and is used only when its
path is listed under `metrics.definitions`.

## Choosing A Storage Model

Use `oracle_metric_samples` when the result is naturally a numeric measurement
with a bounded set of dimensions. Examples include tablespace utilization by
tablespace, process counts by instance, or resource limits by resource name.

Use a dedicated collector and typed table when rows identify diagnostic
entities, dimensions grow without a practical bound, or dashboards need to
query many attributes efficiently. Examples include every SQL ID, SQL text,
session, cursor, execution plan, object, or blocking relationship.

PostgreSQL avoids a Prometheus time-series label explosion, but it does not make
cardinality free. Every unique label combination still creates stored rows, and
unbounded JSON labels increase storage, indexing, retention, and dashboard
costs. Estimate rows per collection cycle and retention before enabling a
medium- or high-cardinality definition.

See [Additional Metrics](../configuration/additional-metrics.md) for the file
schema, ordered override behavior, and examples.
