const logger = (req, res, next) => {
    const time = new Date().toLocaleString();
    const met = req.method;
    const url = req.url;

    console.log(`[${time}] New requisition: ${met} ${url}`);
    
    next();
}

export default logger;