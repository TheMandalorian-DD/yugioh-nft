import { CardPicker } from "@/components/CardPicker";
import MyAppBar from "@/components/MyAppBar";
import ShowPath from "@/components/ShowPath";
import { useActionData, useParams } from "react-router-dom";


export const BidforAuctionPage = () => {
    const { ID } = useParams();
    return (
        <CardPicker
            lastPageMessage={"The seller will see your bid, it is up to them to reject, accept or cancel the auction. You can track the status of your bidding on the details of the auction."}
            lastPageButton={"Finish and Offer Trade"}
            bidding={true} 
            auctionId={ID}/>
    );
}