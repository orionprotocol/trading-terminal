import React from 'react';
import ReactDOM from 'react-dom';

class Menu extends React.Component {

    constructor() {
        super();
        this.state = {}

    }

    componentDidMount() {

    }


    render() {
        let pathName = window.location.pathname;
        return (
            <div className="col-md-1" style={{
                backgroundColor: '#fff',
                height: '100%',
                padding: '0px',
                minHeight: '100%',
                marginBottom: '-9999px',
                paddingBottom: '9999px',
                overflow: 'hidden'
            }}>
                <div style={{paddingLeft: '39%', marginTop: '10px'}}>
                    <img style={{borderRadius: '50%'}} width="40" height="40"
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAFnElEQVR4Xu2dzWvcVRSGz2QymhmaVqGxUZJIoFI/oC4EiQYFxUURizt37qUbF/0rBHHflSvFgK5EBMEKUVoEPwN+bCSp0VhK1E5rsMnMZGTShlQhcs55S66/+ASyu2funee977nn/u7MndryuaW+Jf7m3pmz5eULiUizXmvduq2NVGyj3bKhTj0VqwSVGvPjM7M2+M/+1dICv/2WLf/0Y6rfbmvdekmBh9tNq3eGU/0OZnItFWlWasyPzczaLAL7VENgH6etVnM42E1LyTo42I3ZDAcHYOFgPywc7GdlCiwcHACNg/2wlEnJGuznzBocYEUVHYCFg/cIFmtwADRrsB8WDvazoooOsBo05Vm0E1h1n0Wfv5A6TXrv/Xftu++/deL5e7OJqUm75+h4KvbS4qotLS6mYpWgUmO+/9iD9tyzJ9NDL+JgZW+nrP1KkVVqzEq/xVK0MmgEjpkZBzt5lZqUSr842CnuoJkCWsk6Sr8IjMC7Eyg1K5V+KbICM1oBraQdpV8ERuBdCZSalEq/rMGBCa2AVrKO0i8CIzBF1jYBxUk4OOAkBRZF1h6BLuUGBEbgfVhFFzguVI7A5j89a+e/+iQwFXea9of6VtvMfTvpkYcftWdmTqT6VY5WFVaVrKI/Xjhr8wsfpUAr32144vhT9uTxp1P9KnWDspwhcEAuBA7AUmYlDg6ALvWZLAT2i6SwIkX7ORspOgBLmZWk6ABoUrQfFg72s5I+/oKDA6BxsB8WDvazwsF7xIoqOgAaBwdgUUX7YSmscLCfM/vgACvW4AAs3cHJ40Ll2G5sfMzumz4WeJs7Tdc3rtltjZFU7KEDd1r7j99Tsc3bm3Zt489U7NfffGlrV9ZSscoxpZSiq7gfTRG+EVTV95v+8llV33BW5Kq+XwR2Ko7ATlDXm+U//qbsR0ND/EdjBA7RQ2AvLnVCk6KdpHGwExQpOgRKesDCNinAGgcHYFFk+WGxBvtZSS1xcAgfVbQXFw72khLb4eAQQBzsxYWDvaTEdpV18KunX0ldRrq6dtEuD62msE0dmbZ7j0ynYjfaXfv10m+p2KtXr9jo6MFUbOtA0w7dPZqKba9dtoUfvkjFHm6M2x3Dh1OxW/vgl184lRJYuV5XSTvKN/XyC4N2053ifuUycQQO+EL5ZAUCB0Dj4AAsUrQfFg72s5IeoOPgAGgc7IeFg/2scHCAFVV0ABbbpAAs9sF+WGyT/Kyk30zEwQHQONgPCwf7WeHgACseVQZgsU0KwOKwwQ+r2DapX+tbf3jTP9KbWj5w9CE7eeL5VKxysWeqwxtByqWgH85/YJ8vfJbqvtatWy113ne9u/RxYamKtIqPKkuNGYEDnlLWYAQOgC4FC4EDIlURVhXHTIre55MSgRF4dwJU0f7ZUapuwMF+jaSrnxA4ALoULIqsgEhVhFXFMZOi9/mkRGAEporeJkCK3uduqKzAc6+9kTqMWrm4YktLiwFZd5qOjDRtbOyuVOzKLz9br9tNxSpBpcY8OTFlkxOT6aGn78kqtV1RHrBUMVbJHFtF1vK5pZSDEdhvKmViIbCfs3BDpnLxkxaLwAj8rwRI0c4JoqRZJRYHOwUaNFNAl4pFYAQmRW8TKOVCpV8cjINxMA4OuGC7KQ86/NBI0X5WlayEERiBdyVAkbXPJ4cs8JtnXk8dNii/x9cf6lttsxaQ5qamnbrVO8O5WCGq3+jZZiN3TKm8X+V3HrdOk1469WJK4FLPhZTvyyproXJlRSlWCBxwNAIHYCkzGgeHQJOivbhwsJfUVrv8aoiDQ6BxsBcXDvaSwsEhUkq2o4oOoMbBAVjKrGQNDoFmDfbiwsFeUqzBIVJKtmMNDqDGwQFYyqxkDQ6BZg324vofOtiL5ta2a7RbNtSp39oXdbxar7Vu3daGo+V/q8lfDozn5rFVdJUAAAAASUVORK5CYII="/>
                </div>
                <div
                    style={{width: '100%', padding: '27%', paddingLeft: '32%', paddingBottom: '0px', marginTop: '5px'}}>
                    <div style={{
                        width: '55px',
                        height: '55px',
                        backgroundColor: pathName == '/balance' ? '#1f5af6' : '#fff',
                        textAlign: 'center',
                        paddingTop: '15px',
                        borderRadius: '10%'
                    }}>
                        <a style={{color: '#111'}} href="/balance">
                            <i style={{fontSize: '28px'}} className="fas fa-wallet"></i>
                        </a>
                    </div>
                </div>
                <div style={{width: '100%', padding: '27%', paddingLeft: '32%'}}>
                    <div style={{
                        width: '55px',
                        height: '55px',
                        backgroundColor: pathName == '/' ? '#1f5af6' : '#fff',
                        textAlign: 'center',
                        paddingTop: '15px',
                        borderRadius: '10%'
                    }}>
                        <a style={{color: '#111'}} href="/">
                            <i style={{fontSize: '28px'}} className="fas fa-stream"></i>
                        </a>
                    </div>
                </div>

            </div>
        );
    }
}
;

export default Menu;