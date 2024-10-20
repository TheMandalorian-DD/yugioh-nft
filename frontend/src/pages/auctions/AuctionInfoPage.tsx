import { useNavigate } from 'react-router-dom';
import { checkAccount, useWallet } from '@/utilities'
import styles from '../../styles.module.css'
import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CardContent, CardActions, Typography } from '@mui/material';
import AuctionCard from '@/components/AuctionCard';
import ShowPath from "../../components/ShowPath";
import AuctionCardDetailed from '@/components/AuctionCardDetailed';
import MyAppBar from '@/components/MyAppBar';
import { ethers } from 'ethers';

const mockDataAuction = {
    cardName: "Zattirizortzort",
    from: "0x38d4BAd320711715F4f3B6F41916762e5f2E2F84",
    sellersTokenId: 23,
    auctionId: 2,
    biddedCardName: "Pika Pika",
    bidder: "0x47a45BAd320711715F4f3B6F234234135323125",
    biddersTokenId: 42
};





export const AuctionInfoPage = () => {
    const wallet = useWallet();
    const { ID } = useParams();
    let auctionId = parseInt(ID || "");
    const navigate = useNavigate();
    const [noBidder, setNoBidder] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [auctionData, setAuctionData] = useState({
        sellerAddress: "0x0000000000000000000000000000000000000000"
    });
    const [currentWalletAddress, setCurrentWalletAddress] = useState(wallet?.details.account?.toLowerCase());

    // Get the auction id info
    function acceptAndExchange() {
        wallet?.marketContract.acceptAndExchange(auctionId).then(() => {
            console.log("auction completed!");
        })
    }

    function rejectOffer() {
        wallet?.marketContract.reject(auctionId).then(() => {
            console.log("auction reject!");
        })
    }

    function cancelAuction() {
        wallet?.marketContract.cancel(auctionId).then(() => {
            console.log("auction cancel!");
        })
    }

    useEffect(() => {
        const newFunc = async () => {
            let statusToString = {
                0: "Not Open",
                1: "Open",
                2: "Concluded",
                3: "Cancelled"
            }

            let statusInt = await wallet?.marketContract.statusOf(auctionId);
            let biddersAddress: string = await wallet?.marketContract.currentBidderOf(auctionId);

            let auctionItem = {
                auctionId: auctionId,
                statusInt: statusInt,
                status: statusToString[statusInt], // ignore the warning
                sellerAddress: await wallet?.marketContract.sellerOf(auctionId),
                biddderAddress: await wallet?.marketContract.currentBidderOf(auctionId),
                sellersToken: (await wallet?.marketContract.sellersTokenIdOf(auctionId)).toString(),
                biddersToken: (await wallet?.marketContract.currentBiddersTokenIdOf(auctionId)).toString(),
                hasBidder: !biddersAddress.includes("0x0000000000000000000000000000000000000000"),
            }

            setAuctionData(auctionItem);
            setDisabled(auctionItem.sellerAddress.toLowerCase() != wallet?.details.account.toLowerCase())


            // console.log(auctionItem.sellerAddress.toLowerCase());
            // console.log(wallet?.details.account.toLowerCase());
            // console.log(auctionItem.sellerAddress.toLowerCase());
            // console.log(auctionItem.sellerAddress.toLowerCase() == wallet?.details.account.toLowerCase());

        }
        newFunc()
    }, [wallet])

    return (
        <Grid container spacing={3}>
            <MyAppBar />
            <ShowPath />
            <Grid item xs={12}>
                <h1>Auction Info</h1>
                <AuctionCardDetailed data={auctionData} navigate={navigate} noBidder={noBidder} showOffer={showOffer}></AuctionCardDetailed>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={acceptAndExchange} disabled={disabled}>Accept and Exchange</Button>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={rejectOffer} disabled={disabled}>Reject</Button>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={cancelAuction} disabled={disabled}>Cancel Auction</Button>
            </Grid>
        </Grid>
    );
}