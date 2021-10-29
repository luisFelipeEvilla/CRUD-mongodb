# CRUD-mongodb
CRUD de una libreria creaodo en mogo db


## Configuración base de datos

### Creación de colecciones

use biblioteca

db.Autor.drop()
db.createCollection("Autor")

db.Libro.drop()
db.createCollection("Libro")

db.Autorea.drop()
db.createCollection("Autorea")

db.Edicion.drop()
db.createCollection("Edicion")

db.Copia.drop()
db.createCollection("Copia")

db.Prestamo.drop()
db.createCollection("Prestamo")


### Poblando bd con datos de prueba

use biblioteca

db.Autor.insert([
    {
        "nombre": "Gabriel García Marquez"
    },
    {
        "nombre": "Miguel De Cervantes"
    },
    {
        "nombre": "JK Rowling"
    }
])

db.Libro.insert([
    {
        "titulo": "100 años de soledad"
    },
    {
        "titulo": "Don Quijote"
    },
    {
        "titulo": "Harry Potter"
    }
])

db.Autorea.insert([
    {
        "libro": "100 años de soledad",
        "autor": "Gabriel García Marquez"
    },
    {
        "libro": "Don Quijote",
        "autor": "Miguel De Cervantes"
    },
    {
        "libro": "Harry Potter",
        "autor": "JK Rowling"
    }
])