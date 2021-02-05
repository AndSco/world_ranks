import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout } from "../components/Layout/Layout";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { CountriesTable } from "../components/CountriesTable";

export default function Home({ data }) {
  console.log(data);
  return (
    <Layout>
      <section className={styles.counts}>Found {data.length} countries</section>
      <SearchInput placeholder="Filter by name, region or sub-region" />
      <CountriesTable countries={data} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await fetch("https://restcountries.eu/rest/v2/all").then(data =>
    data.json()
  );

  return {
    props: { data }
  };
};
