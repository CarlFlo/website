async function combinePDFs() {
    const fileInput1 = document.getElementById('file1');
    const fileInput2 = document.getElementById('file2');

    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];

    if (!file1 || !file2) {
        alert('Please select two PDF files');
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.create();
    const [firstPdfBytes, secondPdfBytes] = await Promise.all([
        file1.arrayBuffer(),
        file2.arrayBuffer()
    ]);

    const firstPdfDoc = await PDFLib.PDFDocument.load(firstPdfBytes);
    const secondPdfDoc = await PDFLib.PDFDocument.load(secondPdfBytes);

    const pages1 = await pdfDoc.copyPages(firstPdfDoc, firstPdfDoc.getPageIndices());
    const pages2 = await pdfDoc.copyPages(secondPdfDoc, secondPdfDoc.getPageIndices());

    pages1.forEach((page) => {
        pdfDoc.addPage(page);
    });

    pages2.forEach((page) => {
        pdfDoc.addPage(page);
    });

    const combinedPdfBytes = await pdfDoc.save();

    const combinedPdfBlob = new Blob([combinedPdfBytes], { type: 'application/pdf' });

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(combinedPdfBlob);
    downloadLink.download = 'combined.pdf';
    downloadLink.click();
}

function clearFiles() {
    document.getElementById('file1').value = '';
    document.getElementById('file2').value = '';
}
