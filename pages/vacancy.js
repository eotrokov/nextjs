import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Vacancy = ({ item }) => (
    <Layout>
        <h1>{item.name}</h1>
        <p>{item.employer_name.replace(/<[\/]?p>/g, '')}</p>
        <img src={item.employer_logo} />
    </Layout>
)
Vacancy.getInitialProps = async function (context) {
    const { id } = context.query
    const res = await fetch(`https://api.hh.ru/vacancies/${id}`)
    const show = await res.json()


    return { item: modify(show) }
}

const modify = (item) => {
    return ({
        name: item.name,
        id: item.id,
        employer_logo: item.employer && item.employer.logo_urls && item.employer.logo_urls.original,
        employer_name: item.employer && item.employer.name
    });
}
export default Vacancy