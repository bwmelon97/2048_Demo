import React, { ReactNode } from "react";


type SkeletonHeaderProps = {
    left : ReactNode;
    mid ?: ReactNode;
    right: ReactNode;
}

function SkeletonHeader (props: SkeletonHeaderProps) {

    const { left, mid, right } = props;

    return (
        <div>
            <div> { left  } </div>
            { mid ? <div> { mid } </div> : '' }
            <div> { right } </div>
        </div>
    )
}

function Logo () { return (<div> <h1>Logo</h1> </div>) }
function SearchBar () { return (<div> <h2>SearchBar</h2> </div>) }
function UserStatus () { return (<div> <p>User</p> </div>) }

function BoardHeader () {
    return (
        <SkeletonHeader 
            left = { <Logo /> }
            mid = { <SearchBar /> }
            right = { <UserStatus /> }
        />
    )
}

export default BoardHeader;