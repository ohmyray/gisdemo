const token: string = 'pk.eyJ1Ijoib2hteXJheSIsImEiOiJja2FvMHlrNnUxd3FlMnNtcXQ2YzR6cDNhIn0.VOodHc8C2T6ldql4mnsSeg'

export function accessToken() {
    return function name(target:any) {
        target = token;
    }
}