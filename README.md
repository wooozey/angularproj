# Planszówki
Jest to projekt zarządzania grami planszowymi napisany przy pomocy TypeScript + Angular + Node.js + Postgres + Firebase. Działająca wersja do zobaczenia na stronie: 
[link](http://planszowkiweb.herokuapp.com/login)

Projekt tutaj przedstawiony jest również przygotowany do wrzucenia bezpośrednio na serwis Heroku.

## Opis

Powysza aplikacja umożliwia autoryzację użytkowników, przeglądanie gier planszowych oraz jeżeli posiada się konto administratora dodawanie, edycję i usuwanie gier planszowych.

## Instalacja web

**1.** Na początku należy stworzyć projekt na [Firebase](https://console.firebase.google.com/) i dodać opcję autoryzacji przez maila.

**2.** Skopiować z ustawień **Firebase** informacje o projekcie i wkleić do pliku **src\environments\src\environments.prod.ts** i **src\environments\environment.ts**

**3.** W konsoli wpisać ``` ng build```

**4.** Następnie po zbudowaniu projektu można uruchomić serwer przy pomocy komendy ``` node server.js ```

## Instalacja api
 
 **1.** Na początku należy zainstalować [PostgreSQL](https://www.postgresql.org/)
 **2.** Logowanie na postgres w celu stworzenie bazy.
 ``` 
 psql -u nazwa_użytkownika
 ```
 
 **3.** Tworzenie bazy danych.
 ```CREATE DATABASE planszowki_database;```
 
 **4.** Tworzenie tabeli do gier
 ```
CREATE TABLE planszowki(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    players VARCHAR(255),
    for_age VARCHAR(255),
    difficulty VARCHAR(255),
    avrg_time VARCHAR(255),
    price VARCHAR(255),
    producer VARCHAR(255),
    creation_date VARCHAR(255)
);
```
 
 **5.** Podmienić dane logowania do bazy w pliku **server.js**:
 ```
 const pool = new Pool({
  user: "",
  password: "",
  host: "",
  port: 5432,
  database: ""
});
```
**6.** Następnie pozostaje uruchomić serwer poprzez komendę ``` node index.js ```

## Przydzielanie administratora
Po wejściu na stworzony projekt na stronie **Firebase** należy wyszukać jakiemu użytkownikowi chcemy przydzielić administratora i następnie zmienić wartość pola **isAdmin** na **true**.
![image](https://i.ibb.co/QMNgDRY/test.png)

## Podsumowanie
Po wykonaniu powyższych kroków projekt powinien być w pełni funkcjonalny.
