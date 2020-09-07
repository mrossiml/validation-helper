export const Patterns = {
    PATTERN_EMAIL: '^[-a-z0-9~!$%^&*_:+}{\\\'?]+(\\.[-a-z0-9~!$%^&*_:+}{\\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$',
    PATTERN_NUMEROS_ENTEROS: '^[0-9]*$',
    PATTERN_NUMEROS_ENTEROS_POSITIVOS: '^[1-9]{1}([0-9]*)?$',
    // decimales con 2 nros detras de la coma
    PATTERN_DECIMALES: '^(([1-9]{1}([0-9]*))|0{1})?(\\.[0-9]{1,2})?$',
    // decimales con N nros detras de la coma
    PATTERN_CON_N_DECIMALES: '^(([1-9]{1}([0-9]*))|0{1})?(\\.[0-9]{1,99})?$',
    PATTERN_FECHA: '^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$',
    PATTERN_ANIO: '^2[0-9]{3}$',
    PATTERN_PORCENTAJE: '^100$|^100\\.0$|^100\\.00$|^([1-9]?[0-9](\\.[0-9]{1,2})?)$',
    FORMATOS_MEDIA_PERMITIDOS: ['.bmp', '.gif', '.jpg', '.jpeg', '.png', '.avi', '.mp4', '.ogg', '.svg+xml'],
    FORMATOS_MEDIA_PERMITIDOS_CSV: ['.csv', '.vnd.ms-excel'],
};
