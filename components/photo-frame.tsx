import Image from 'next/image';

import { CreditChip } from '@/components/illustrative-note';
import type { PhotoAsset } from '@/lib/images';
import { cn } from '@/lib/utils';

type PhotoFrameProps = {
  image: PhotoAsset;
  priority?: boolean;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Adds the slow cinematic scale on hover. */
  zoom?: boolean;
  showCredit?: boolean;
  /** Renders as a plain div when the parent element owns the semantics. */
  as?: 'div' | 'figure';
};

export function PhotoFrame({
  image,
  priority = false,
  sizes,
  className,
  imageClassName,
  zoom = false,
  showCredit = true,
  as: Tag = 'div',
}: PhotoFrameProps) {
  return (
    <Tag className={cn('relative overflow-hidden bg-[var(--surface-sunken)]', className)}>
      {/* `fill` and `width`/`height` are mutually exclusive — the image is
          absolutely positioned inside the sized container, so `fill` + `sizes`
          is the correct combination. */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={80}
        className={cn(
          'object-cover transition-transform duration-[1400ms] ease-editorial',
          zoom && 'group-hover:scale-[1.06] group-focus-within:scale-[1.06]',
          imageClassName,
        )}
      />
      {showCredit ? (
        <span className="absolute bottom-3 left-3 z-10">
          <CreditChip credit={image.credit} />
        </span>
      ) : null}
    </Tag>
  );
}