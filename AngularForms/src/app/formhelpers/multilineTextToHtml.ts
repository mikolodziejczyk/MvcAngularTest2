
/**
 * Replaces \r\n with <br/> in the specified text.
 * @param text The text to replace crlf with <br/>
 */
export function multilineTextToHtml(text: string): string {
    let r: string | null | undefined;

    if (text) {

        let rx = /\r\n/g;
        r = text.replace(rx, "<br/>");
    }
    else {
        r = text
    }
    
    return r;
}