import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react'
import Header from '../Header/Header.jsx'
import { useGetProductsQuery } from '../../state/api.js'
import { useState } from 'react'
import { Collapse, Rating, useMediaQuery, useTheme } from '@mui/material';

const Produts = ({
    i,
    name,
    description,
    price,
    rating,
    category,
  }) => {
    const theme = useTheme();
    const [isExtend, setIsExtend] = useState(false);
  
    const handleSeeMoreClick = () => {
      setIsExtend((prevIsExtend) => !prevIsExtend);
    };
  
    return (
      <Card
        sx={{
          minWidth: 275,
          backgroundImage: "none",
          backgroundColor: theme.palette.alt,
          borderRadius: ".55rem",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={theme.palette.secondary[400]}>
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    );
  };

/**/
export default function Product() {
    const { data, isLoading } = useGetProductsQuery()
    const isNonMobile = useMediaQuery("(min-width:1000px)")

    return (
        <Box m="1.5rem 2.5rem" >
            <Header title="PRODUCTS" subTitle="See your list of products." />
            {data || !isLoading ? (
                <Box
                    mt='20px'
                    display="grid"
                    justifyContent="space-between"
                    gridTemplateColumns="repeat(4,minmax(0,1fr))"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
                >
                    {data?.map(({
                        _id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        MyProduct

                    },i) => (
                        <Produts
                            key={i}
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            MyProduct={MyProduct}
                            i={i+1} />
                    ))}

                </Box>
            ) : (<>Loading</>)}
        </Box>
    )
}
