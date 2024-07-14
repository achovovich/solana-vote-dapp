import { useAppContext } from "../../context/context";
import Link from 'next/link';

export default function SpacesList({ proposalKey }) {

    const context = useAppContext();
    const { accounts } = useAppContext();

    const { getProposal } = useAppContext();


    return (

        <div >
            Proposal data for {proposalKey}
        </div>
    );
};