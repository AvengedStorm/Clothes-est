import ReactCardCarousel from "react-card-carousel";
import ig_logo from '../../pages/pictures/ig_logo.png'
import fb_logo from '../../pages/pictures/fb_logo.png'
import tw_logo from '../../pages/pictures/tw_logo.png'
import wa_logo from '../../pages/pictures/wa_logo.png'
import li_logo from '../../pages/pictures/li_logo.png'
import mg_logo from '../../pages/pictures/mg_logo.png'

const Carousel = () => {
    const CARD_STYLE = {
        height: "5vw",
        width: "5vw",
        paddingTop: "12px",
        textAlign: "center",
        color: "transparent",
        fontFamily: 'VictorMono-Oblique',
        fontSize: "1.5rem",
        userSelect: "none",
        textTransform: "uppercase",
        borderRadius: "10px",
        boxSizing: "border-box",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    const styles = {
        CONTAINER_STYLE: {
            position: "fixed",
            height: "10vh",
            width: "10vw",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "middle",
            bottom: '3vh',
            right: '3vw',
        },
        ig_bg: {
            ...CARD_STYLE,
            backgroundImage: `url(${ig_logo})`
        },
        fb_bg: {
            ...CARD_STYLE,
            backgroundImage: `url(${fb_logo})`,
        },
        li_bg: {
            ...CARD_STYLE,
            backgroundImage: `url(${li_logo})`,
        },
        tw_bg: {
            ...CARD_STYLE,
            backgroundImage: `url(${tw_logo})`,
        },
        mg_bg: {
            ...CARD_STYLE,
            backgroundImage: `url(${mg_logo})`,
        },
        wa_bg: {
            ...CARD_STYLE,
            backgroundImage: `url(${wa_logo})`,
        },
    }
    return (
        <div style={styles.CONTAINER_STYLE}>
            <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
                <div style={styles.ig_bg}>
                    <a style={CARD_STYLE} href='https://www.instagram.com/moon_l3tters/' target="_blank" rel="noreferrer">Click Me</a>
                </div>
                <div style={styles.tw_bg}>
                    <a style={CARD_STYLE} href='https://twitter.com/Moon_L3tters' target="_blank" rel="noreferrer">Click Me</a>
                </div>
                <div style={styles.fb_bg}>
                    <a style={CARD_STYLE} href='https://www.facebook.com/omri.jukin' target="_blank" rel="noreferrer">Click Me</a>
                </div>
                <div style={styles.li_bg}>
                    <a style={CARD_STYLE} href='https://www.linkedin.com/in/omri-jukin/' target="_blank" rel="noreferrer">Click Me</a>
                </div>
                <div style={styles.mg_bg}>
                    <a style={CARD_STYLE} href='https://www.messenger.com/' target="_blank" rel="noreferrer">Click Me</a>
                </div>
                <div style={styles.wa_bg}>
                    <a style={CARD_STYLE} href='https://api.whatsapp.com/send?phone=972523344064' target="_blank" rel="noreferrer">Click Me</a>
                </div>
            </ReactCardCarousel>
        </div>
    )
}

export default Carousel;