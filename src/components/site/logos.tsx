import type { IconType } from 'react-icons'
import {
  SiPython,
  SiScala,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiApachehadoop,
  SiApachehive,
  SiDatabricks,
  SiTrino,
  SiPresto,
  SiRedis,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiRedhatopenshift,
  SiGithubactions,
  SiTerraform,
  SiMicrosoftazure,
  SiAmazonaws,
  SiMlflow,
  SiFastapi,
  SiVuedotjs,
  SiApacheflink,
  SiNeo4J,
  SiInfluxdb,
  SiMinio,
  SiPowerbi,
  SiGnubash,
  SiReact,
  SiGraphql,
  SiScikitlearn,
  SiPlaywright,
  SiPytest,
} from 'react-icons/si'

export type Logo = { name: string; Icon: IconType; color?: string }

// color omitted → inherits text colour (for logos that are black/white by brand)
export const logos: Record<string, Logo> = {
  python: { name: 'Python', Icon: SiPython, color: '#4B8BBE' },
  scala: { name: 'Scala', Icon: SiScala, color: '#DC322F' },
  spark: { name: 'Apache Spark', Icon: SiApachespark, color: '#E25A1C' },
  kafka: { name: 'Apache Kafka', Icon: SiApachekafka },
  airflow: { name: 'Airflow', Icon: SiApacheairflow, color: '#017CEE' },
  hadoop: { name: 'Hadoop', Icon: SiApachehadoop, color: '#66CCFF' },
  hive: { name: 'Hive', Icon: SiApachehive, color: '#E8C400' },
  databricks: { name: 'Databricks', Icon: SiDatabricks, color: '#FF3621' },
  trino: { name: 'Trino', Icon: SiTrino, color: '#DD00A1' },
  presto: { name: 'Presto', Icon: SiPresto, color: '#5890FF' },
  redis: { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
  mysql: { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  postgres: { name: 'PostgreSQL', Icon: SiPostgresql, color: '#5B8DEF' },
  docker: { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  kubernetes: { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
  openshift: { name: 'OpenShift', Icon: SiRedhatopenshift, color: '#EE0000' },
  actions: { name: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
  terraform: { name: 'Terraform', Icon: SiTerraform, color: '#9B6BDF' },
  azure: { name: 'Azure', Icon: SiMicrosoftazure, color: '#0078D4' },
  aws: { name: 'AWS', Icon: SiAmazonaws, color: '#FF9900' },
  mlflow: { name: 'MLflow', Icon: SiMlflow, color: '#0194E2' },
  fastapi: { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
  vue: { name: 'Vue', Icon: SiVuedotjs, color: '#4FC08D' },
  flink: { name: 'Flink', Icon: SiApacheflink, color: '#E6526F' },
  neo4j: { name: 'Neo4j', Icon: SiNeo4J, color: '#4581C3' },
  influx: { name: 'InfluxDB', Icon: SiInfluxdb, color: '#22ADF6' },
  minio: { name: 'MinIO', Icon: SiMinio, color: '#C72E49' },
  powerbi: { name: 'Power BI', Icon: SiPowerbi, color: '#E6B800' },
  bash: { name: 'Bash', Icon: SiGnubash, color: '#4EAA25' },
  react: { name: 'React', Icon: SiReact, color: '#38BDF8' },
  graphql: { name: 'GraphQL', Icon: SiGraphql, color: '#E10098' },
  sklearn: { name: 'scikit-learn', Icon: SiScikitlearn, color: '#F7931E' },
  playwright: { name: 'Playwright', Icon: SiPlaywright, color: '#2EAD33' },
  pytest: { name: 'pytest', Icon: SiPytest, color: '#0A9EDC' },
}

const pick = (keys: string[]) => keys.map((k) => logos[k])

export const marqueeTop = pick([
  'python', 'spark', 'kafka', 'airflow', 'scala', 'databricks', 'trino', 'hadoop',
  'hive', 'redis', 'postgres', 'mysql', 'flink', 'presto', 'minio', 'bash', 'influx',
])

export const marqueeBottom = pick([
  'docker', 'kubernetes', 'openshift', 'actions', 'terraform', 'azure', 'aws', 'mlflow',
  'fastapi', 'pytest', 'playwright', 'sklearn', 'neo4j', 'vue', 'react', 'graphql', 'powerbi',
])

export const orbitRings: Logo[][] = [
  pick(['python', 'scala', 'spark', 'kafka']),
  pick(['airflow', 'databricks', 'trino', 'hive', 'redis', 'postgres', 'flink', 'hadoop']),
  pick(['docker', 'kubernetes', 'openshift', 'actions', 'terraform', 'azure', 'aws', 'mlflow', 'fastapi', 'pytest', 'playwright', 'mysql']),
]
