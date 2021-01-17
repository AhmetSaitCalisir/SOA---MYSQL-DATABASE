export class Izin {
  constructor(
    public ID: number = 0,
    public Ad: string = 'Çalışan İsmi Yükleniyor',
    public Soyad: string = 'Çalışan Soyismi Yükleniyor',
    public BirimAd: string = 'Birim İsmi Yükleniyor',
    public UnvanAdi: string = 'Ünvan Yükleniyor',
    public BaslangicTarih: string = 'Başlangıç Tarihi Yükleniyor',
    public BitisTarih: string = 'Bitiş Tarihi Yükleniyor',
    public onaylayanAd: string = 'Onaylayan Yönetici İsmi Yükleniyor',
    public onaylayanSoyad: string = 'Onaylayan Yönetici Soyismi Yükleniyor'
  ) {}
}
