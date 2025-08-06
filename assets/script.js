        // PDF Generation Logic
        document.getElementById('downloadPdf').addEventListener('click', function () {
            const element = document.getElementById('cv-content');
            const originalButtonContent = this.innerHTML;
            this.innerHTML = `<i class="fas fa-spinner fa-spin text-2xl"></i>`;
            this.disabled = true;

            html2canvas(element, {
                scale: 2,
                useCORS: true
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const canvasAspectRatio = canvas.width / canvas.height;
                let imgWidth = pdfWidth;
                let imgHeight = pdfWidth / canvasAspectRatio;
                if (imgHeight > pdfHeight) {
                    imgHeight = pdfHeight;
                    imgWidth = imgHeight * canvasAspectRatio;
                }
                const x = (pdfWidth - imgWidth) / 2;
                const y = (pdfHeight - imgHeight) / 2;
                pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
                pdf.save('CV_Constanza_Murua.pdf');
                this.innerHTML = originalButtonContent;
                this.disabled = false;
            }).catch(err => {
                console.error("Error al generar PDF:", err);
                alert("Hubo un error al generar el PDF. Por favor, intente de nuevo.");
                this.innerHTML = originalButtonContent;
                this.disabled = false;
            });
        });