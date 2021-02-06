import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Layout } from "../components/Layout/Layout";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { CountriesTable } from "../components/CountriesTable";
import { getAllCoutriesData } from "../utils/utils";

export default function Home({ data }) {
  const [searchInput, setSearchInput] = useState("");
  console.log(data);

  const handleInput = e => setSearchInput(e.target.value.toLowerCase());
  const filteredCountries = [...data].filter(
    country =>
      country.name.toLowerCase().includes(searchInput) ||
      country.region.toLowerCase().includes(searchInput) ||
      country.subregion.toLowerCase().includes(searchInput)
  );

  return (
    <Layout>
      <section className={styles.counts}>
        Found {filteredCountries.length} countries
      </section>
      <SearchInput
        placeholder="Filter by name, region or sub-region"
        value={searchInput}
        onChange={handleInput}
      />
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllCoutriesData();

  return {
    props: { data }
  };
};
