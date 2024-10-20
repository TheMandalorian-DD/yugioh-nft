import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CardContent, CardActions, Typography, Button, Paper } from '@mui/material';

// auctionId: auctionId,
// statusInt: statusInt,
// status: statusToString[statusInt],
// sellerAddress: await wallet.marketContract.sellerOf(auctionId),
// biddderAddress: await wallet.marketContract.currentBidderOf(auctionId),
// sellersToken: await wallet.marketContract.sellersTokenIdOf(auctionId),
// biddersToken: await wallet.marketContract.currentBiddersTokenIdOf(auctionId),
// hasBidder: biddersAddress.includes("0x0000000000000000000000000000000000000000"),

export default function AuctionCard({ data: { auctionId, statusInt, status, sellerAddress, biddderAddress, sellersToken, biddersToken, hasBidder }, navigate }) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Paper>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Offering: <a href={"/CardInfoPage/" + sellersToken}>{sellersToken}</a>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        From: <a href={"/UserInfoPage/" + sellerAddress}>{sellerAddress}</a>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        TokenId: {sellersToken}
                    </Typography>
                    <Typography variant="body2">
                        {status}
                    </Typography>
                    <Typography variant="body2">
                        {auctionId}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => { navigate("/UserPage/AuctionPage/BidforAuctionPage/" + auctionId) }} size="small">Offer a Card for Exchange</Button>
                    <Button onClick={() => { navigate("/AuctionInfoPage/" + auctionId) }} size="small">See Details</Button>
                </CardActions>
            </Paper>
        </React.Fragment>
    );
}
