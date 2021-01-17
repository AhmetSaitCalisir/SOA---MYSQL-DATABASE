export class Ameliyat {
  constructor(
    public ameliyatID: Number = 0,
    public Ad: String = 'İsim Yükleniyor',
    public Soyad: String = 'Soyisim Yükleniyor',
    public BirimAd: string = 'Birim İsmi Yükleniyor',
    public AmeliyatTarih: string = 'Ameliyat Tarihi Yükleniyor',
    public AmeliyatAciklama: string = 'Ameliyat Açıklaması Yükleniyor'
  ) {}
}
