import React, { FC, useState } from 'react';
import classes from './FollowButton.module.css';
import arrow from '../../../images/arrow.svg';
import CloseRound from '../../../images/close-round.svg';

interface FollowButtonProps{
    isFollow: boolean
}


const FollowButton: FC<FollowButtonProps> = ({isFollow}) => {

    const [visible, setVisible] = useState<boolean>(false)

    const rootSubBlockClasses = [classes.follow_sub_block];

    const visibleSub = () =>{
        setVisible(true)
    }
    const unVisibleSub = () =>{
        setVisible(false);
    }

    if (visible){
        rootSubBlockClasses.push(classes.active);
    }

    return (
        <div className={classes.follow_button}>
            {isFollow
                ? <div onMouseOut={unVisibleSub} onMouseOver={visibleSub} className={classes.follow_body}>
                    <div className={`${classes.follow_body_active} ${classes.button}`}>
                        <div className={classes.follow_body_arrow}>
                            <img src={arrow} alt="" />
                        </div>
                        <div className={classes.follow_body_text}>FOLLOW</div>
                    </div>
                    <div className={rootSubBlockClasses.join(' ')}>
                        <div className={classes.follow_sub_block_image}>
                            <img src={CloseRound} alt="" />
                        </div>
                        <div className={classes.follow_sub_block_text}>Unfollow</div>
                    </div>
                </div>
                : <div className={`${classes.follow_unfollow_button} ${classes.button}`}>Follow</div>
            }
        </div>
    );
};

export default FollowButton;