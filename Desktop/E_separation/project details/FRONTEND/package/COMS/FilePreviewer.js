import React, { useState } from 'react';
import { Document, Page } from "react-pdf";
import PdfJsWorker from "pdfjs-dist/build/pdf.worker.entry";

const FilePreviewer = (props) => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    if (props.mimeType.includes('pdf')) {
        return (
            <Document
                file={"data:application/pdf;base64," + props.file_content}
                options={{ workerSrc: PdfJsWorker }}
                onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        )
    } else if (['jpg', 'png', 'jpeg', 'webp'].includes(props.mimeType)) {
        return (
            <img src={"data:image/png;base64," + props.file_content} />
        )
    } else {
        return (
            <p style={{ margin: "30px", fontSize: '25px' }}>Unable to Preview</p>
        )
    }

}

export default FilePreviewer