import jwtDecode, {JwtPayload} from "jwt-decode";

export function extractUsername(token: string) {
    const decoded = jwtDecode(token) as JwtPayload
    return decoded === undefined ? "" : decoded.sub
}