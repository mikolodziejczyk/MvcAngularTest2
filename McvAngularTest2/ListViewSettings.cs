//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace McvAngularTest2
{
    using System;
    using System.Collections.Generic;
    
    public partial class ListViewSettings
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ListViewSettings()
        {
            this.UserActiveView = new HashSet<UserActiveView>();
        }
    
        public int Id { get; set; }
        public Nullable<int> UserId { get; set; }
        public int ListId { get; set; }
        public bool IsTemporary { get; set; }
        public bool IsDefault { get; set; }
        public string Name { get; set; }
        public string ViewData { get; set; }
        public bool IsPublic { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserActiveView> UserActiveView { get; set; }
    }
}
