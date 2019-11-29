import React, { Component } from 'react';
import intl from 'react-intl-universal';
class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    componentDidMount(){
       
    }
    
    render() {
        
        return (
            <div className="service">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>{intl.get('Service Agreement')}</span>
                </header>
                <section>
                    <div className="content">
                        <h3>{intl.get('Privacy Agreement')}</h3>
                        <h4>Last updated March 25, 2019</h4>

                        <p>This is a contract (the “Agreement”) between you and DECENTRALIZED CYBERSPACE FOUNDATION LIMITED (“Violas”
                            “we” or “us”), a foundation registered under the laws of Singapore with DECENTRALIZED CYBERSPACE FOUNDATION
                            LIMITED 38 TOH TUCK ROAD #05-02 GOODLUCK GARDEN SINGAPORE (596716). References in this Agreement to “you”
                            and “your” are to the person with whom Violas enters into this Agreement.</p>
                        <p>By clicking on “I agree” or similar terms when creating a Wallet (as defined below) tthrough download or any
                            of our associated browser extensions, websites, APIs, or mobile applications (collectively, the “Services”),
                            or by proceeding with a download or update for a Wallet when offered a choice of proceeding or not, you are
                            agreeing to be bound by the terms and conditions found in this Agreement. You represent and warrant that you
                            have the power and capacity to enter into this Agreement.</p>
                     
                        <h4>Violas Services</h4>
                        <p>The Violas Services enable you to create one or more multi-signature, hierarchical deterministic (HD),
                            non-custodial cryptocurrency wallets for certain supported digital assets (“Wallet”) and to use the Wallet
                            to store, send, request and receive supported digital assets.</p>
                        <p>Our Services are intended for use by persons who are very knowledgeable about cryptocurrency generally and HD
                            non-custodial wallets in particular. If you use our Services, you represent that you qualify as such a
                            person. You acknowledge and agree that you have carefully read and understood our Terms of Service.</p>
                         
                        <h4>Supported Digital Assets</h4>
                        <p>Our Services, including any Wallet, are for use with Violas, are for use with Bitcoin (BTC) only and any
                            other digital assets we may explicitly decide to support in the future at our discretion (“Digital Assets”).
                            We have no obligation to support any digital assets (including but not limited to any forkcoins, altcoins,
                            airdrops or any other digital assets however named) other than Violas, Libra and Bitcoin or any other
                            digital asset we may explicitly decide to support in the future at our discretion. We assume no
                            responsibility or liability in connection with any attempt to use your Wallet for digital assets that we do
                            not support. Keys or signatures held or produced by us belong to us and we reserve all rights to and
                            associated with them.</p>
                         
                        <h4>Responsibility for Mnemonics, PINs and Other Authentication Means</h4>
                        <p>Our Services provide a number of ways for you to secure your Wallet and help ensure you, and only you, are
                            able to access and transact through your Wallet. These features include mnemonics, multisignature, among
                            other features. </p>
                        <p>We do not store or have access to your mnemonics, PINs or private keys.</p>
                        <p>It is your responsibility to carefully guard your mnemonics, PINs, and any other means we may provide for you
                            to secure and access your Wallet. If you forget or lose your means of authentication Violas has no way to
                            recover them for you and you may permanently lose access to any Digital Assets you have stored in your
                            Wallet.</p>
                         
                        <h4>Mnemonics and Catastrophic Impact of Their Loss or Misappropriation</h4>
                        <p>If you use our Services to create a Wallet, the software will use an algorithm to generate a random 24-word
                            phrase as a seed to a BIP32 hierarchical wallet. This 24-word phrase is called a mnemonic and if reproduced
                            exactly stores all the information needed to recover your Wallet if access through a PIN, two-factor
                            authentication or other authentication means is lost or otherwise not available. </p>
                        <p>Violas does not store, have access to, or have any way or means of recovering your mnemonic.</p>
                        <p>It is your responsibility to keep your mnemonic secure. You should not provide it to anyone, including any
                            Violas representative.</p>
                        <p>If you permanently forget or lose your mnemonic, you will NEVER be able to recover any cryptocurrency in your
                            Wallet, and you will suffer a complete, irrecoverable and catastrophic loss of all Digital Assets in your
                            Wallet.</p>
                        <p>It is your responsibility to safeguard and retain your mnemonic. Violas has no responsibility and will not be
                            liable for any loss or damage you suffer from the loss or misappropriation of your mnemonic.</p>
                         
                        <h4>Recovery Feature and Risks</h4>
                        <p>On the Android and iOS mobile wallets and web wallet, you could restore your wallet from your mnemonic and
                            all accounts will become available after restore. On the desktop wallets, you could re-import your wallet
                            from your exported wallet and all accounts will become available after re-import. If you could not restore
                            your wallet from your mnemonic on your mobile devices or re-import from your exported wallet on your desktop
                            computer, you will lose your access to your accounts in your wallet. </p>
                         
                        <h4>Intellectual Property</h4>
                        <p>We grant you a limited, personal, non-transferable, non-exclusive license to access and use the Website and
                            to use the Services as provided to you by Violas, subject to the terms of this Agreement and solely for
                            approved purposes as permitted by us from time to time, except that we license certain of our software under
                            the licenses set out in the source code repositories available here and here. Any other use of the Website
                            or the Services is expressly prohibited and all other rights, titles and interests in the Website and the
                            Services are exclusively the property of Violas and its licensors. "Violas" and all logos related to the
                            Services or displayed on the Website are trademarks of Violas or its licensors. You may not copy, imitate or
                            use them without our prior written consent.</p>
                         
                        <h4>Changes to or Termination of our Services</h4>
                        <p>We may add or remove functions or features of our Services. You can stop using our Services at any time. We
                            may stop providing our Services at any time at our discretion.</p>
                        <p>If we stop providing our Services, for whatever reason, we will endeavor to provide advance notice to you.
                            However, we will have no obligation to do so. </p>
                         
                        <h4>Your Compliance with Applicable Laws</h4>
                        <p>You represent and warrant that you are using the Services, including any Wallet, in accordance with applicable law, and not for any purpose not in compliance with applicable law, including but not limited to illegal gambling, fraud, money laundering or terrorist activities.</p>
                         
                        <h4>Disclaimer of Warranties</h4>
                        <p>All Violas Services, including any Wallet, are provided on an "as is" and "as available" basis without any representation or warranty of any kind, whether express or implied, to the maximum extent permitted by applicable law. Specifically, we disclaim any implied warranties of title, merchantability, fitness for a particular purpose and/or non-infringement. </p>
                         
                        <h4>Exclusion and Limitation of Liability</h4>
                        <p>In no event will Violas, its directors, officers, employees, suppliers, agents or affiliates be liable for any loss or damages, including without limitation, direct, indirect, special, consequential, exemplary or punitive loss or damages, arising from or related to your use of the Services or a Wallet, including but not limited to loss of or inability to access or transact data, profit, Digital Assets, or other digital assets or cryptocurrency.</p>
                        <p>Without limiting the generality of the foregoing, Violas takes no responsibility for and will not be liable for any financial or other loss or damage arising from or related to the use of our Services, including Wallets, including but not limited to any of the following.</p>
                        <p>Financial loss due to Wallet access being "Brute-forced".</p>
                        <p>Financial loss due to server failure or data loss.</p>
                        <p>Financial loss due to server hacks or unavailability.</p>
                        <p>Financial loss due to forgotten mnemonics or passwords.</p>
                        <p>Financial loss due to inability to transact.</p>
                        <p>Financial loss due to errors calculating network fees.</p>
                        <p>Financial loss due to corrupted data on our servers.</p>
                        <p>Financial loss due to incorrectly constructed transactions or mistyped bitcoin addresses.</p>
                        <p>Financial loss due to "phishing" or other websites masquerading as Violas.</p>
                        <p>Violas takes no responsibility for, and will not be liable for, our Services being unavailable due to technical or other issues beyond our control.</p>
                        <p>The total liability of Violas, its directors, officers, employees, suppliers, agents or affiliates arising from or related to the Services, including Wallets, in the aggregate for all claims is limited to USD 50 or 40 EUR.</p>
                        <p>The exclusions and limitations of our liability in this Section 9 are subject to any obligations that we have under applicable law and regulations, including possible liability for loss or damages resulting from our fraud, gross negligence or willful misconduct.</p>
                         
                        <h4>Indemnification</h4>
                        <p>You will hold harmless and indemnify Violas, its directors, officers, employees, suppliers, agents or affiliates from and against any claim, suit or action arising from or related to your use of the Services, including Wallets, or violation of this Agreement, including any liability arising from claims, losses, damages, suits, judgments, litigation costs and attorneys’ fees.</p>
                         
                        <h4>What the Violas Service Does Not Do</h4>
                        <p>We do not have access to your Wallet or any Digital Assets stored in it. Any Digital Assets stored using the Services are not in our control. As explained above, we do not store or have any means of recovering your private keys, mnemonics, PINs or passwords.</p>
                        <p>Violas is not a bank, custodian, financial intermediary or regulated financial institution. Violas does not have control over or take any responsibility for any transactions made through our Services. We do not accept any deposits from, lend to, or generally engage in any kind of banking business or the business of a financial institution, whether in or from within Singapore or otherwise.</p>
                        
                        <p>Our Services are for supported Digital Assets only. </p>
                        <p>We have no control over and do not make any representations regarding the value of Digital Assets, or the operation of the underlying software protocols which govern the operation of Digital Assets supported on our platform. We assume no responsibility for the operation of the underlying protocols and we are not able to guarantee their functionality, security or availability.</p>

                         
                        <h4>Information on our Website</h4>
                        <p>The information contained on our website is for general information purposes only. The information is provided by Violas and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
                         
                        <h4>Governing Law and Dispute Resolution</h4>
                        <p>(a) If you are resident outside the United States, this Agreement will be governed by English law and the non-exclusive jurisdiction of the English courts. However, if you are an individual not engaged in conduct related to your trade, business or profession, and you are resident outside England and Wales, you may also petition the courts of the jurisdiction in which you reside ("Home Jurisdiction") and the law governing this Agreement may include any such consumer laws of your Home Jurisdiction that provide greater consumer protection than is available under English law.</p>
                        <p>(b) If you are resident in the United States, this Agreement is governed by the laws (but not those relating to conflict of laws) of California and you agree that any dispute arising under this Agreement will be finally settled in binding arbitration, on an individual basis, in accordance with the American Arbitration Association's rules for arbitration of consumer-related disputes (accessible here) and you and we hereby expressly waive trial by jury and right to participate in a class action lawsuit or class-wide arbitration. The arbitration will be conducted by a single, neutral arbitrator and will take place in the county or parish in which you reside, or another mutually agreeable location, in the English language. The arbitrator may award any relief that a court of competent jurisdiction could award, including attorneys' fees when authorized by law, and the arbitral decision may be enforced in any court. At your request, hearings may be conducted in person or by telephone and the arbitrator may provide for submitting and determining motions on briefs, without oral hearings. The prevailing party in any action or proceeding to enforce this Agreement will be entitled to costs and attorneys' fees.</p>
                        <p>If the arbitrator(s) or arbitration administrator would impose filing fees or other administrative costs on you, we will reimburse you, upon request, to the extent such fees or costs would exceed those that you would otherwise have to pay if you were proceeding instead in a court. We will also pay additional fees or costs if required to do so by the arbitration administrator's rules or applicable law. Apart from the foregoing, each of us will be responsible for our own fees or costs, such as attorney fees that we each may incur. If a court decides that any provision of this section is invalid or unenforceable, that provision will be severed and the other parts of this section will still apply. In any case, the remainder of the terms of this agreement will continue to apply.
                        </p>
                         
                        <h4>Data Protection</h4>
                        <p>You acknowledge that we may collect, use, store and process personal data in relation to you (if you are an individual), and personal data that you have provided or in the future provide to us in relation to your employees and other associated or other individuals, in connection with this Agreement, or the Services.</p>
                        <p>For more information on the way in which we process the information about you, please refer to our Privacy Policy.</p>
                         
                        <h4>Miscellaneous</h4>
                        <p>No action or inaction by Violas will be considered a waiver of any right or obligation by Violas.</p>
                        <p>This Agreement may be amended by Violas by providing you advance notice of any proposed change. If you do not agree to the amended agreement then your sole remedy will be to stop using the Services, including any Wallet.</p>
                        <p>You may not assign this Agreement. Violas may assign this Agreement.</p>
                        <p>This Agreement controls the relationship between Violas and you. They do not create any third party beneficiary rights.</p>
                        <p>Your use of the Services, any Wallet and the Website is subject to international export controls and economic sanctions requirements. You agree that you will comply with those requirements. You are not permitted to use any of the Services if: (1) you are in, under the control of, or a national or resident of Cuba, Iran, North Korea, Sudan, or Syria or any other country subject to United States embargo or UN sanctions (a "Sanctioned Country"), or if you are a person on the U.S. Treasury Department's Specially Designated Nationals List or the U.S. Commerce Department's Denied Persons List, Unverified List or Entity List, (a "Sanctioned Person"); or (2) you intend to supply any Digital Assets in a Wallet to a Sanctioned Country (or a national or resident of a Sanctioned Country) or Sanctioned Person.</p>
                        <p>All provisions of this Agreement which by their nature extend beyond the expiration or termination of this Agreement, will continue to be binding and operate after the termination or expiration of this Agreement. If a particular term of this Agreement is determined to be invalid or not enforceable under any applicable law, this will not affect the validity of any other term. This Agreement (including documents incorporated by reference in it) is the entire agreement between Violas and you and supersedes any other agreement, representations (or misrepresentations), or understanding, however communicated. </p>
                         
                        <p>Copyright &copy; 2019 Violas | About us</p>
                        <p>DECENTRALIZED CYBERSPACE FOUNDATION LIMITED</p>
                        <p>38 TOH TUCK ROAD #05-02</p>
                        <p>GOODLUCK GARDEN</p>
                        <p>SINGAPORE (596716)</p>
                    </div>
                </section>
            </div>
        );
    }
}

export default Service;
