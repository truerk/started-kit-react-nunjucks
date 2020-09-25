const filtersNunjucks = {
    shorten(value, count) {
        return value.slice(0, count || 5);
    }
};

module.exports = filtersNunjucks