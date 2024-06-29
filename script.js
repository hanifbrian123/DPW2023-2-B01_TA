// bagian dari pemrosesan input PIN supaya user tidak bisa menginputkan lagi setelah panjang inputannya sudah 6 digit
// Mengambil elemen input PIN berdasarkan id
var pin = document.getElementById('pin_id')
// Menambahkan event listener untuk mendengarkan perubahan input pada elemen PIN
pin.addEventListener('input', function(){
	// Jika panjang input melebihi 6 karakter, potong input sehingga hanya 6 karakter pertama yang diambil
	if ( (pin.value.length) > 6 ){
		pin.value = pin.value.slice(0, 6)
	}
})


// --- fungsi validasi MASUKAN WAJIB ---
function required(inputan){
	// Mengembalikan false jika inputan kosong, true jika tidak
	if ( inputan=="" ){
		return false;
	}
	return true;
}




// Mengambil elemen form berdasarkan id 'form_id'
submit = document.getElementById('form_id')
// Menambahkan event listener untuk mendengarkan saat form disubmit
submit.addEventListener('submit', function(event){

	/* --- pemanggilan value atau hanya element saja ketika tidak ada '.value' masukan user ---
	Adapun trim yaitu untuk menghapus spasi diawal dan diakhir inputan dari user jika ada. 
	dan mengosongkan inputan ketika user hanya memasukkan spasi saja dalam inputan. karena itu akan
	kami anggap	sebagai inputan kosong
	*/
	// get element input (nama, nama untuk akun, email, masa langganan ekspektasi clien) menggunakan id lalu diambil value nya
	var namaAnda_value = document.getElementById('nama_id').value.trim()
	var uName_value = document.getElementById('uName_id').value
	var email_value = document.getElementById('email_id').value
	var masaLangganan_value = document.getElementById('masaLangganan_id').value.trim()
	var clientExpec_value = document.getElementById('clientExpec_id').value.trim()

	// get element input jenis pembayaran mengguanakan HTML DOM lalu diambil value nya
	var pembayaran_value = myForm.pembayaran.value
	
	// mengambil value dari input pin yang sudah di dapatkan element-nya diatas
	var pin_value = pin.value

	// Mengambil elemen input checkbox syarat dan ketentuan menggunakan HTML DOM
	var skE = myForm.sk




	// Regex untuk validasi inputan alfabet (akan digunakan untuk validasi masukan nama asli usernya) dan alfanumerik (akan digunakan untuk validasi masukan nama untuk akun eksklusifnya yang akan dibuatnya)
	var cek_alfabet = /^[a-zA-Z\s]+$/ // mulai dari awal string '^' sampai akhir string '$' --  [a-zA-Z\s] : hanya memperbolehkan huruf alfabet (a-z,A-Z) dan spasi (\s) -- + : Satu atau lebih karakter yang sesuai dengan pola sebelumnya
	var cek_alfanumerik = /^[A-Za-z\d\.\_]+$/ // mulai dari awal string '^' sampai akhir string '$' -- [A-Za-z\d\.\_] : hanya memperbolehkan huruf alfabet (a-z,A-Z), angka (\d), dan garis bawah (_) -- + : Satu atau lebih karakter yang sesuai dengan pola sebelumnya

	// Inisialisasi awal hasil validasi sebagai true, nanti akan bertemu 'hasil = false' jika ada inputan yang tidak valid
	var	hasil = true

	// Mencegah event default form ketika di submit
	event.preventDefault()



	/* 
	untuk menampilkan pesan error, kami menggunakan tag div yang mula mula innerHTML nya 
	kosong dan terdapat dibawah setiap elemen field masukan. ketika dalam validasi ternyata ada yang 
	tidak valid maka elemen div tersebut di get disini dengan menggunakan getElementById lalu diisi innerHTML-nya 
	dengan pesan error yang sesuai. dan jika masukan dari user sudah valid maka innerHTML-nya (pesan errornya) di kosongkan
	*/



	/*
	validasi NAMA LENGKAP
	mengandung jenis validasi masukan format ALFABET - PANJANG KARAKTER TERTENTU
	field masukan: textbox
	Jika nama lengkap diisi maka lakukan validasi masukan format alfabet dan panjang karakter tertentu.	jika tidak diisi maka dibiarkan karena masukan ini tidak wajib diisi
	*/
	if ( required(namaAnda_value)==true ) { // Jika nama lengkap diisi. dicek menggunakan menggunakan fungsi validasi masukan wajib yang telah dibuat diatas. namun jika tidak diisi maka dibiarkan dan pesan error dikosongkan karena masukan bukan masukan wajib
		if ( cek_alfabet.test(namaAnda_value)==false ) { // Cek apakah hanya mengandung alfabet
			document.getElementById('errorMessage_namaLengkap').innerHTML = 'Masukan format alfabet'
			hasil = false
		}else if ( namaAnda_value.length > 40 ) { // Cek apakah panjang masukan lebih dari 40 karakter
			document.getElementById('errorMessage_namaLengkap').innerHTML = 'Panjang masukan tidak boleh lebih dari 40 karakter'
			hasil = false
		}else{
			document.getElementById('errorMessage_namaLengkap').innerHTML = "" // Kosongkan pesan error jika valid
		}
	}else{
		document.getElementById('errorMessage_namaLengkap').innerHTML = "" // Kosongkan pesan error
	}





	// validasi USER NAME
	// mengandung jenis validasi masukan format ALFANUMERIK - PANJANG KARAKTER TERTENTU - MASUKAN WAJIB
	// field masukan: textbox
	if ( required(uName_value)==false ){ // Cek apakah user name diisi (menggunakan fungsi validasi masukan wajib yang telah dibuat diatas)
		document.getElementById('errorMessage_uName').innerHTML = 'Masukan Nama untuk akun Anda tidak boleh kosong'
		hasil = false
	}else if ( cek_alfanumerik.test(uName_value)==false ){ // Cek dengan menggunakan regex yang telah dibuat. apakah hanya mengandung alfanumerik
		document.getElementById('errorMessage_uName').innerHTML = "Masukan format alfanumerik (A-Z,a-z,'.','_')"
		hasil = false
	}else if ( uName_value.length > 25 ){ // Cek dengan menggunakan regex yang telah dibuat. apakah panjang masukan lebih dari 25 karakter
		document.getElementById('errorMessage_uName').innerHTML = "Panjang masukan tidak boleh lebih dari 25 karakter"
		hasil = false
	}else{
		document.getElementById('errorMessage_uName').innerHTML = "" // Kosongkan pesan error jika valid
	}





	// validasi EMAIL
	// mengandung jenis validasi masukan format EMAIL - MASUKAN WAJIB
	// field masukan: textbox
	var matchAt = email_value.match(/@/g) // cari '@' dalam email. dengan ini jika '@' tidak ada maka akan mengembalikan null jika ada maka akan mengembalikan semua '@' yang didapatnya (akan berupa list)
	if ( required(email_value)==false ){ // Cek apakah email diisi (menggunakan fungsi validasi masukan wajib yang telah dibuat diatas)
		document.getElementById('errorMessage_email').innerHTML = "masukan email tidak boleh kosong"
		hasil = false
	}else{
		if ( matchAt==null ){ // Cek apakah '@' tidak ada
			document.getElementById('errorMessage_email').innerHTML = "email valid mengandung satu '@'"
			hasil = false					
		}else{
			if (matchAt.length>1){ // Cek apakah ada lebih dari satu '@'
				document.getElementById('errorMessage_email').innerHTML = "email valid mengandung satu '@'"
				hasil = false
			}else{
				var arrEmail = email_value.split('@') // Pisahkan email menjadi nama email dan domain dengan menggunakan split '@'
				var emailName = arrEmail[0] // Ambil bagian sebelum '@' sebagai nama email
				var domain = arrEmail[1] // Ambil bagian setelah '@' sebagai domain
				console.log(emailName)
				if ( /^[^A-Z\&\=\_\'\-\+\,\<\>\s\@]+$/.test(emailName) == false ){ // Cek apakah nama email valid
				    /*
				    dibawah ini untuk regex diatas ini
				    ^               : Mulai dari awal string
				    [^A-Z\&\=\_\'\-\+\,\<\>\s\@] : Tidak boleh mengandung huruf kapital, tanda '&', '=', '_', '\'', '-', '+', ',', '<', '>', spasi, atau '@'
				    +               : Satu atau lebih karakter yang sesuai dengan pola sebelumnya
				    $               : Sampai akhir string
				    */
					document.getElementById('errorMessage_email').innerHTML = "nama email tidak valid"
					hasil = false
				}else{
					if (/^([^A-Z\&\=\_\'\-\+\,\<\>\s\@\d]+)\.com$/.test(domain) == false ){ // Cek apakah domain valid dan berakhiran .com
				        /*
				        Cek apakah domain berakhiran .com
				        ^               : Mulai dari awal string
				        [^A-Z\&\=\_\'\-\+\,\<\>\s\@] : Domain tidak boleh mengandung huruf kapital, tanda '&', '=', '_', '\'', '-', '+', ',', '<', '>', spasi, atau '@'
				        +               : Satu atau lebih karakter yang sesuai dengan pola sebelumnya
				        \.com           : Harus diakhiri dengan '.com'
				        $               : Sampai akhir string
				        */
						document.getElementById('errorMessage_email').innerHTML = "domain harus valid dan domain level teratas harus .com"
						hasil = false
					}else{
						document.getElementById('errorMessage_email').innerHTML = "" // Kosongkan pesan error jika valid
					}
				}				
			}

		}
	}
	



	// validasi MASA LANGGANAN
	// mengandung jenis validasi MASUKAN WAJIB
	// field masukan: dropdown select
	if ( required(masaLangganan_value)==false ){ // (menggunakan fungsi validasi masukan wajib yang telah dibuat diatas) Cek apakah masa langganan dipilih jika user tidak memilih masa langganan value nya akan kosong karena value awal pertama kali membuka form adalah dibuat kosong
		document.getElementById('errorMessage_masaLangganan').innerHTML = "Masukan wajib, harap memilih masa langganan"
		hasil = false
	}else{
		document.getElementById('errorMessage_masaLangganan').innerHTML = "" // Kosongkan pesan error jika valid
	}
	






	// validasi PIN
	// mengandung jenis validasi masukan format NUMERIK - PANJANG DIGIT TERTENTU - MASUKAN WAJIB
	// field masukan: textbox
	if ( required(pin_value)==false ){ // (menggunakan fungsi validasi masukan wajib yang telah dibuat diatas) Cek apakah PIN diisi
		document.getElementById('errorMessage_pin').innerHTML = "Masukkan pin tidak boleh kosong"
		hasil = false		
	}else if ( /\D/.test(pin_value) == true ){ // Cek apakah hanya mengandung angka jika ditest terdapat selain angka (\D) maka berarti tidak valid jika tidak terdapat maka berarti lanjut
		document.getElementById('errorMessage_pin').innerHTML = "Masukkan hanya format numerik"
		hasil = false
	}else if ( pin_value.length < 6 ){ // Cek apakah panjang PIN kurang dari 6 digit
		document.getElementById('errorMessage_pin').innerHTML = "Masukkan 6 digit"
		hasil = false
	}else{
		document.getElementById('errorMessage_pin').innerHTML = "" // Kosongkan pesan error jika valid
	}
	




	// validasi PEMBAYARAN
	// mengandung jenis validasi MASUKAN WAJIB
	// field masukan: radio button
	if ( required(pembayaran_value)==false ){ // (menggunakan fungsi validasi masukan wajib yang telah dibuat diatas) Cek apakah metode pembayaran dipilih. menggunakan fungsi validasi masukan wajib yang telah dibuat diatas karena jika masukan radio button tidak dipilih maka akan mengembalikan nilai kosong ("")
		document.getElementById('errorMessage_pembayaran').innerHTML = "Masukan jenis pembayaran tidak boleh kosong"
		hasil = false
	}else{
		document.getElementById('errorMessage_pembayaran').innerHTML = "" // Kosongkan pesan error jika valid
	}




	// validasi ekspektasi pelanggan
	// mengandung jenis validasi PANJANG KARAKTER
	// field masukan: textarea
	if ( required(clientExpec_value)==true ){ // Cek apakah ekspektasi pelanggan diisi jika diisi maka dilakukan validasi selanjutnya, jika tidak maka dibiarkan dan pesan error dikosongkan karena field masukan ini tidak wajib diisi 
		if ( clientExpec_value.length > 500 ){ // Cek apakah panjang ekspektasi pelanggan lebih dari 500 karakter
			document.getElementById('errorMessage_clienExpec').innerHTML = "Masukan tidak boleh lebih dari 500 karakter"
			hasil = false
		}else{
			document.getElementById('errorMessage_clienExpec').innerHTML = "" // Kosongkan pesan error jika valid
		}
	}else{
		document.getElementById('errorMessage_clienExpec').innerHTML = "" // Kosongkan pesan error jika valid
	}
	





	// validasi setuju dengan syarat dan ketentuan
	// mengandung jenis validasi MASUKAN WAJIB
	// field masukan: checkbox
	if (skE.checked==false){ // Cek apakah checbox ini check oleh user jika tidak (false) maka munculkan pesan error
		document.getElementById('errorMessage_sk').innerHTML = "Harus setuju syarat dan ketentuan terlebih dahulu sebelum submit"
		hasil = false
	}else{
		document.getElementById('errorMessage_sk').innerHTML = "" // Kosongkan pesan error jika valid
	}
	




	// jika tidak ada yang salah artinya hasil tetap true tidak berubah maka dilakukan lah submit manual karena tadi di eventdefault submit form dicegah
	if ( hasil == true ){
		event.target.submit()
	}	

})
