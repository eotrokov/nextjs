import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';

const Index = ({ items }) => (
    <Layout>
        <div className="root">
            <GridList cellHeight={180}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Vacancies</ListSubheader>
                </GridListTile>
                {items.map(tile => (
                    <GridListTile key={tile.id}>
                        {tile.employer_logo ? <img src={tile.employer_logo} alt={tile.name} /> : null}
                        <GridListTileBar
                            title={tile.name}
                            subtitle={tile.employer_name}
                            actionIcon={
                                <Link as={`/vacancy/${tile.id}`} href={`/vacancy?id=${tile.id}`}>
                                    <InfoIcon />
                                </Link>
                            }
                        />

                    </GridListTile>
                ))}
            </GridList>
        </div>
        <style jsx>{`
       .root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    .icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    `}</style>
    </Layout>
)

Index.getInitialProps = async function () {
    const res = await fetch('https://api.hh.ru/vacancies')
    const { items } = await res.json()
    return {
        items: modify(items)
    }
}
const modify = (items) => {
    return items.map(item => ({
        name: item.name,
        id: item.id,
        employer_logo: item.employer && item.employer.logo_urls && item.employer.logo_urls.original,
        employer_name: item.employer && item.employer.name
    }));
}
export default Index