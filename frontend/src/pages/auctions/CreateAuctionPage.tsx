import { CardPicker } from "@/components/CardPicker";
import MyAppBar from "@/components/MyAppBar";
import ShowPath from "@/components/ShowPath";


export const CreateAuctionPage = () => {
        return (
                <>
                        <MyAppBar />
                        <ShowPath />
                        <CardPicker
                                lastPageMessage={"People will see your trade offer in the auctions page, they will bid their offer. It is up to you to reject, accept or cancel their offers."}
                                lastPageButton={"Finish and Create Auction"}
                                bidding={false}
                                auctionId={-1} />
                </>
        );
}