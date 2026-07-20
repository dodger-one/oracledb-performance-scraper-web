---
title: Grafana Dashboards
sidebar_position: 4
---

# Grafana Dashboards

Grafana reads the PostgreSQL storage database directly. Configure a PostgreSQL
datasource that points at the same database used by the scraper.

The Docker Compose test stack provisions the datasource automatically from:

```text
docker-compose/grafana/datasources/datasources.yaml
```

Dashboard JSON files are stored in:

```text
docker-compose/grafana/dashboards/
```

## Included Dashboards

### Database Activity History (DAH)

File:

```text
docker-compose/grafana/dashboards/database-activity-history.json
```

Purpose:

- Average active sessions by wait class.
- Top SQL by active samples.
- Top sessions by active samples.
- Activity by `SQL_ID`.
- Recent activity samples.
- Top wait events.
- Module/program activity.

Primary table:

```text
oracle_database_activity_samples
```

This dashboard is the AAS-style historical activity view. It intentionally uses
high-cardinality fields that should not be Prometheus labels.

[![Database Activity History dashboard showing average active sessions, top SQL, top sessions, and recent activity](/img/screenshots/dah.png)](/img/screenshots/dah.png)

_Database Activity History dashboard with anonymized sample data. Select the
image to open it at full resolution._

The `Activity Source` variable keeps `SESSION`, `ASH`, and migrated `LEGACY`
rows separate. `SESSION` is the default collector. `ASH` appears only when the
scraper was explicitly configured to use Oracle ASH and the operator accepted
responsibility for verifying Diagnostics Pack licensing.

### Oracle SQL Performance

File:

```text
docker-compose/grafana/dashboards/oracle-sql-performance.json
```

Purpose:

- Top SQL by elapsed time delta.
- Top SQL by CPU time delta.
- Top SQL by User I/O wait delta.
- SQL efficiency outliers.
- Short SQL text previews in ranking tables.

Primary tables:

```text
oracle_sql_samples
oracle_sql_texts
oracle_sql_plans
```

This dashboard is the category overview. Select a `SQL_ID` in any ranking table
to open the same database, SQL ID, and time range in the Top Consumers
dashboard. Ranking tables intentionally show only a short SQL preview.

### Oracle SQL Top Consumers

File:

```text
docker-compose/grafana/dashboards/oracle-sql-top-consumers.json
```

Purpose:

- Top 20 SQL consumers by elapsed-time delta for the selected time range.
- Elapsed, CPU, User I/O, application, concurrency, and cluster time breakdown.
- Execution, row-processing, and parse-call deltas.
- Buffer-get, disk-read, and direct-write deltas.
- Category ranks and the dominant measured pressure for every top consumer.
- Available plan hashes and cached execution-plan operations.
- Complete `SQL_FULLTEXT` for the selected `SQL_ID`.

The top table is the entry point for statement-level troubleshooting. Select a
`SQL_ID` to populate the detailed graphs, full SQL text, and plans below it.
Select `PLAN_HASH_VALUE` when a statement has multiple collected plans. The
plan panel displays the cached `GV$SQL_PLAN` operation tree, objects, optimizer
estimates, partition bounds, and predicates; it does not contain runtime
`ALLSTATS` values.

SQL text and plan details are collected on the bounded `performance.sqlPlans`
schedule. A top consumer can therefore appear before its detail is collected,
or after its Oracle cursor has aged out. The dashboard reports that state as
`Not collected or aged out` instead of hiding the SQL statistics.

### Current Sessions and Blocking

File:

```text
docker-compose/grafana/dashboards/oracle-sessions-and-blocking.json
```

Purpose:

- Current active SQL sessions.
- Current waiters by event.
- Long-running active sessions.
- Blocking sessions.
- Session inventory by user, module, and program.

Primary tables:

```text
oracle_session_samples
oracle_blocking_session_samples
```

This dashboard is the current-state triage view. Historical active-session
graphs live in the DAH dashboard instead.

[![Current Sessions and Blocking dashboard showing active sessions, waiters, blockers, and session inventory](/img/screenshots/sessions_and_blocking.png)](/img/screenshots/sessions_and_blocking.png)

_Current Sessions and Blocking dashboard with anonymized sample data. Select
the image to open it at full resolution._

## Importing Manually

If you are not using the Compose provisioning files:

1. Create a Grafana PostgreSQL datasource.
2. Set its UID to `PostgreSQL`, or edit the dashboard JSON files to match your
   datasource UID.
3. Import the JSON dashboards from `docker-compose/grafana/dashboards/`.

## Required Data

The dashboards assume the scraper is writing these tables:

- `oracle_database_activity_samples`
- `oracle_sql_samples`
- `oracle_sql_texts`
- `oracle_sql_plans`
- `oracle_session_samples`
- `oracle_blocking_session_samples`

If a dashboard is empty, verify:

- `metrics.scrapeInterval` is configured.
- PostgreSQL `output.postgresql.url` is correct.
- the Oracle monitoring user can query the relevant `GV$` views.
- Grafana time range includes recently collected rows.
