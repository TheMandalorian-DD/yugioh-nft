import { useWallet } from '@/utilities';
import styles from '../../styles.module.css'
import { Button, CardActions, CardContent, Grid, ImageList, ImageListItem, ListItem, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AuctionView from '@/components/AuctionView';
import ShowPath from "../../components/ShowPath";
import MyAppBar from '@/components/MyAppBar';

var auctionList = [
    {
        cardName: "Pikaçu",
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        sellersTokenId: 9482,
        auctionId: 0,
    },
    {
        cardName: "Zabadazibi",
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        sellersTokenId: 12312,
        auctionId: 1,
    },
    {
        cardName: "Zattirizortzort",
        from: "0x38d4BAd320711715F4f3B6F41916762e5f2E2F84",
        sellersTokenId: 23,
        auctionId: 2,
    },

];


export const AuctionPage = () => {
    const wallet = useWallet();
    const navigate = useNavigate();
    const [listOfAuctions, setListOfAuctions] = useState([]);

    function handleCreateAuction() {
        navigate("/UserPage/AuctionPage/CreateAuctionPage");
    }

    // useEffect(() => {

    // }, [wallet])
    wallet?.marketContract.list().then((listOfOpenAuctionIds) => {
        listOfOpenAuctionIds = listOfOpenAuctionIds.map((e) => { return e.toNumber() })
        let statusToString = {
            0: "Not Open",
            1: "Open",
            2: "Concluded",
            3: "Cancelled"
        }

        listOfOpenAuctionIds.map(async (auctionId) => {
            let statusInt = await wallet.marketContract.statusOf(auctionId);
            let biddersAddress: string = await wallet.marketContract.currentBidderOf(auctionId);

            let auctionItem = {
                auctionId: auctionId,
                statusInt: statusInt,
                status: statusToString[statusInt],
                sellerAddress: await wallet.marketContract.sellerOf(auctionId),
                biddderAddress: await wallet.marketContract.currentBidderOf(auctionId),
                sellersToken: (await wallet.marketContract.sellersTokenIdOf(auctionId)).toString(),
                biddersToken: (await wallet.marketContract.currentBiddersTokenIdOf(auctionId)).toString(),
                hasBidder: !biddersAddress.includes("0x0000000000000000000000000000000000000000"),
            }

            if (listOfAuctions.filter((element) => { return auctionId == element.auctionId }).length == 0) {
                console.log(listOfAuctions);

                setListOfAuctions([...listOfAuctions, auctionItem])
            }

        })
    })



    return (
        <div className={styles.body}>
            <MyAppBar />
            <ShowPath />
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ alignItems: 'center' }}>
                    <Button style={{ width: '100%' }} variant="contained" color="secondary" onClick={handleCreateAuction}>
                        Create a New Auction
                    </Button>
                </Grid>

                {/* <Grid item xs={12}>
                    <AuctionView auctionCollection={listOfAuctions} navigate={navigate}></AuctionView>
                </Grid> */}

                <Grid item xs={12}>
                    <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
                        {listOfAuctions.map((item) => (
                            <ImageListItem>
                                {/* <img
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                /> */}
                                <Paper sx={{ width: "100%", height: "250px" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Offering: <a href={"/CardInfoPage/" + item.sellersToken}>{item.sellersToken}</a>
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            From: <a href={"/UserInfoPage/" + item.sellerAddress}>{item.sellerAddress}</a>
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            TokenId: {item.sellersToken}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.status}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.auctionId}
                                        </Typography>
                                        <Button onClick={() => { navigate("/UserPage/AuctionPage/BidforAuctionPage/" + item.auctionId) }} size="small">Offer a Card for Exchange</Button>
                                        <Button onClick={() => { navigate("/AuctionInfoPage/" + item.auctionId) }} size="small">See Details</Button>
                                    </CardContent>
                                </Paper>
                                {/* <AuctionViewV2></AuctionViewV2> */}
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </div>
    );
}; 