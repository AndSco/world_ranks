import { useRouter } from "next/router";
import { Layout } from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Image from "next/image";
import {
  getCountryInfo,
  getNeighbourInfo,
  getAllCoutriesData
} from "../../utils/utils";
import { CustomLink } from "../../components/CustomLink";

const CountryPage = ({ countryData, neighbourCountries }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading</h2>;
  }

  return (
    <Layout title={countryData.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <section className={styles.overview_panel}>
            <Image
              src={countryData.flag}
              width={1080}
              height={720}
              alt={countryData.name}
            />
            <h1 className={styles.overview_name}>{countryData.name}</h1>
            <h2 className={styles.overview_region}>{countryData.region}</h2>
            <section className={styles.details_container}>
              <div className={styles.overview_population}>
                <h2 className={styles.overview_value}>
                  {countryData.population}
                </h2>
                <h3 className={styles.overview_label}>Population</h3>
              </div>
              <div className={styles.overview_area}>
                <h2 className={styles.overview_value}>{countryData.area}</h2>
                <h3 className={styles.overview_label}>Area</h3>
              </div>
            </section>
          </section>
        </div>

        <div className={styles.container_right}>
          <section className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <article className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {countryData.capital}
              </div>
            </article>

            <article className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {countryData.subregion}
              </div>
            </article>

            <article className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {countryData.languages.map(({ name }) => name).join(", ")}
              </div>
            </article>

            <article className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {countryData.currencies
                  .map(({ name, symbol }) => `${name} (${symbol})`)
                  .join(", ")}
              </div>
            </article>

            <article className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {countryData.nativeName}
              </div>
            </article>

            <article className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {countryData.gini ? countryData.gini + "%" : "NA"}
              </div>
            </article>

            <aside className={styles.neighbours_panel}>
              <h5 className={styles.neighbours_header}>
                Neighbouring countries
              </h5>
              <div className={styles.neighbour_countries_container}>
                {neighbourCountries.map(country => (
                  <CustomLink
                    href={`/country/${country.alpha3Code}`}
                    key={country.name}
                  >
                    <article className={styles.neighbour}>
                      <Image
                        src={country.flag}
                        width={250}
                        height={150}
                        alt={country.name}
                      />
                      <h4 className={styles.neighbour_name}>{country.name}</h4>
                    </article>
                  </CustomLink>
                ))}
              </div>
            </aside>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CountryPage;

export const getStaticProps = async context => {
  const {
    params: { id }
  } = context;

  const countryData = await getCountryInfo(id);
  const neighboursIds = countryData.borders;
  const neighbourCountries = await Promise.all(
    neighboursIds.map(getNeighbourInfo)
  );

  return {
    props: {
      countryData,
      neighbourCountries
    }
  };
};

export const getStaticPaths = async context => {
  const allCountries = await getAllCoutriesData();
  const ids = allCountries.map(country => country.alpha3Code);
  const paths = ids.map(id => ({ params: { id } }));

  return {
    paths: paths,
    fallback: false
  };
};
