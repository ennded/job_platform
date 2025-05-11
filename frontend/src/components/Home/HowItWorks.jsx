import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'


const HowItWorks = () => {
    return (
        <div className="howitworks">
            <div className="container">
                <h3>How JobZee Works</h3>
                <div className="banner">
                    <div className="card">
                        <FaUserPlus />
                        <p>Create Account</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis explicabo dignissimos tenetur illo iure. Libero iusto doloribus ullam. Exercitationem omnis quam fuga odit voluptas sequi veritatis vel, eaque consequuntur accusamus ipsam tempore excepturi autem ullam illo error dolor optio? Nam ipsum modi facilis fugit eligendi nihil natus repellendus nulla dignissimos.</p>
                    </div>

                    <div className="card">
                        <MdFindInPage />
                        <p>Find a Job/Post a Job</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis explicabo dignissimos tenetur illo iure. Libero iusto doloribus ullam. Exercitationem omnis quam fuga odit voluptas sequi veritatis vel, eaque consequuntur accusamus ipsam tempore excepturi autem ullam illo error dolor optio? Nam ipsum modi facilis fugit eligendi nihil natus repellendus nulla dignissimos.</p>
                    </div>

                    <div className="card">
                        <IoMdSend />
                        <p>Create Account</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis explicabo dignissimos tenetur illo iure. Libero iusto doloribus ullam. Exercitationem omnis quam fuga odit voluptas sequi veritatis vel, eaque consequuntur accusamus ipsam tempore excepturi autem ullam illo error dolor optio? Nam ipsum modi facilis fugit eligendi nihil natus repellendus nulla dignissimos.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks