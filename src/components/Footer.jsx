import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import '../styles/footer.css'


function Footer({isDark}) {

    return ( 
        <div className={isDark ? "footer-dark": "footer"}>
            <div style={{display:'flex', verticalAlign:'middle',alignItems:'center'}}>
                <img src={isDark ? icon1: icon2} height='100px'/>
                <p className=''>&copy; WeCoded . All RIghts Reserved.</p>
            </div>

            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <p style={{marginRight:'10px'}}>Made By Charles</p>
                <a href='https://github.com/Charles7458'>
                <box-icon  type='logo' name='github'size='sm' color={isDark ? "black" : "white"}></box-icon>
                </a>
            </div>
        </div>
     );
}

export default Footer;