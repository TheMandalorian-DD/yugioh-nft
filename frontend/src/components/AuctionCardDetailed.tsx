import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CardContent, CardActions, Typography, Button, Paper, Grid } from '@mui/material';



export default function AuctionCardDetailed({ data: { auctionId, statusInt, status, sellerAddress, biddderAddress, sellersToken, biddersToken, hasBidder }, navigate, noBidder, showOffer }) {
    noBidder = !hasBidder;
    const theme = useTheme();

    return (
        <React.Fragment>
            <Paper>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Auctioned Card: <a href={"/CardInfoPage/" + sellersToken}>{sellersToken}</a>
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                From: <a href={"/UserInfoPage/" + sellerAddress}>{sellerAddress}</a>
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                TokenId: {sellersToken}
                            </Typography>
                        </CardContent>
                    </Grid>
                    {noBidder ? (
                        <Grid item xs={6}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Offered Card: There is no offer :/
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    From: "N/A"
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    TokenId: "N/A"
                                </Typography>

                            </CardContent>

                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Offered Card: <a href={"/CardInfoPage/" + biddersToken}>{biddersToken}</a>
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    From: <a href={"/UserInfoPage/" + biddderAddress}>{biddderAddress}</a>
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    TokenId: {biddersToken}
                                </Typography>
                            </CardContent>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {showOffer ? (<div>
                        <Typography variant="body2">
                            {auctionId}
                        </Typography>
                        <CardActions>
                            <Button onClick={() => { navigate("/UserPage/AuctionPage/BidforAuctionPage/" + auctionId) }} size="small">Offer a Card for Exchange</Button>
                        </CardActions>
                    </div>) : (<div>

                    </div>)}
                </Grid>

            </Paper>
        </React.Fragment>
    );
}
